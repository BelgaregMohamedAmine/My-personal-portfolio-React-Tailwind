import os
import json
import cloudinary
import cloudinary.uploader
from pathlib import Path
from typing import Dict, List, Union, Optional
import logging
from datetime import datetime
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(Path('logs') / f'portfolio_upload_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class CloudinaryConfigError(Exception):
    """Custom exception for Cloudinary configuration errors."""
    pass

class PortfolioImageUploader:
    def __init__(self):
        """Initialize the uploader with Cloudinary credentials from environment variables."""
        self._configure_cloudinary()
        
    def _configure_cloudinary(self) -> None:
        """Configure Cloudinary with credentials from environment variables."""
        required_vars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        
        if missing_vars:
            raise CloudinaryConfigError(f"Missing required environment variables: {', '.join(missing_vars)}")
            
        try:
            cloudinary.config(
                cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
                api_key=os.getenv('CLOUDINARY_API_KEY'),
                api_secret=os.getenv('CLOUDINARY_API_SECRET')

            )
            logger.info("Cloudinary configured successfully")
        except Exception as e:
            logger.error(f"Failed to configure Cloudinary: {str(e)}")
            raise CloudinaryConfigError(f"Cloudinary configuration failed: {str(e)}")

    @staticmethod
    def create_slug(title: str) -> str:
        """Create a URL-friendly slug from a title."""
        # Remove special characters and convert to lowercase
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        # Replace whitespace with hyphens
        slug = re.sub(r'[-\s]+', '-', slug).strip('-')
        return slug

    def get_image_path(self, base_dir: str, image_path: str) -> Path:
        """Convert relative image path to absolute path."""
        # Remove common prefixes
        image_path = re.sub(r'^(/public/|/projects/|/)', '', image_path)
        
        # Convert to Path object and resolve to absolute path
        full_path = Path(base_dir) / image_path
        return full_path.resolve()

    def upload_image(self, image_path: Path, folder: str, public_id: Optional[str] = None) -> Optional[Dict]:
        """Upload a single image to Cloudinary and return the result."""
        try:
            if not image_path.exists():
                logger.warning(f"Image file not found: {image_path}")
                return None

            # Validate file type
            if not self._is_valid_image(image_path):
                logger.warning(f"Invalid image file type: {image_path}")
                return None

            upload_params = {
                "folder": folder,
                "use_filename": True,
                "unique_filename": True,
                "resource_type": "auto"  # Automatically detect resource type
            }
            
            if public_id:
                upload_params["public_id"] = public_id

            result = cloudinary.uploader.upload(str(image_path), **upload_params)
            logger.info(f"Successfully uploaded: {image_path.name}")
            return result
        except Exception as e:
            logger.error(f"Failed to upload {image_path}: {str(e)}")
            return None

    @staticmethod
    def _is_valid_image(file_path: Path) -> bool:
        """Validate if the file is an allowed image type."""
        ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
        return file_path.suffix.lower() in ALLOWED_EXTENSIONS

    def process_project_images(self, project: Dict, img_dir: Path) -> Dict:
        """Process all images for a single project."""
        try:
            # Ensure slug exists
            slug = project.get('slug') or self.create_slug(project['title'])
            project['slug'] = slug
            folder = f"portfolio0/{slug}"

            logger.info(f"Processing project: {project['title']}")

            # Handle thumbnail
            if project.get('thumbnail'):
                thumbnail_path = self.get_image_path(img_dir, project['thumbnail'])
                if thumbnail_path.exists():
                    thumbnail_result = self.upload_image(thumbnail_path, folder)
                    if thumbnail_result:
                        project['thumbnail'] = thumbnail_result['secure_url']
                        project['thumbnail_width'] = thumbnail_result['width']
                        project['thumbnail_height'] = thumbnail_result['height']
                        logger.info(f"Updated thumbnail URL: {project['thumbnail']}")

            # Handle images array
            if 'images' in project and isinstance(project['images'], list):
                new_images = []
                for img in project['images']:
                    try:
                        if isinstance(img, dict):
                            img_path = self.get_image_path(img_dir, img['url'])
                            if img_path.exists():
                                result = self.upload_image(img_path, folder)
                                if result:
                                    new_img = {
                                        'url': result['secure_url'],
                                        'alt': img.get('alt', img_path.stem),
                                        'width': result['width'],
                                        'height': result['height']
                                    }
                                    new_images.append(new_img)
                                    logger.info(f"Added image with URL: {new_img['url']}")
                        else:
                            img_path = self.get_image_path(img_dir, img)
                            if img_path.exists():
                                result = self.upload_image(img_path, folder)
                                if result:
                                    new_img = {
                                        'url': result['secure_url'],
                                        'alt': img_path.stem,
                                        'width': result['width'],
                                        'height': result['height']
                                    }
                                    new_images.append(new_img)
                                    logger.info(f"Added image with URL: {new_img['url']}")
                    except Exception as e:
                        logger.error(f"Error processing image in project {project['title']}: {str(e)}")

                if new_images:
                    project['images'] = new_images
                    logger.info(f"Updated project {project['title']} with {len(new_images)} images")
                else:
                    logger.warning(f"No images were successfully processed for project {project['title']}")

            return project

        except Exception as e:
            logger.error(f"Error processing project {project.get('title', 'Unknown')}: {str(e)}")
            return project

    def process_portfolio(self, json_path: Path, img_dir: Path) -> None:
        """Process the entire portfolio JSON file."""
        try:
            # Create logs directory if it doesn't exist
            Path('logs').mkdir(exist_ok=True)
            
            # Load JSON data
            json_path = Path(json_path)
            with json_path.open('r', encoding='utf-8') as f:
                data = json.load(f)

            # Process each project
            updated_projects = [
                self.process_project_images(project.copy(), img_dir)
                for project in data['projects']
            ]

            # Update the projects in the data
            data['projects'] = updated_projects
            data['last_updated'] = datetime.now().isoformat()

            # Save updated JSON with timestamp
            output_path = json_path.parent / f'updated_portfolio_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
            
            with output_path.open('w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Successfully saved updated JSON to: {output_path}")

        except Exception as e:
            logger.error(f"Failed to process portfolio: {str(e)}")
            raise

def main():
    """Main execution function."""
    try:
        # Configuration
        json_path = Path('D:/my-portfolio-website/my-portfolio/src/data/projectData.json')
        img_dir = Path('D:/my-portfolio-website/my-portfolio/public/projects/')
        
        # Validate paths
        if not json_path.exists():
            raise FileNotFoundError(f"JSON file not found: {json_path}")
        if not img_dir.exists():
            raise FileNotFoundError(f"Image directory not found: {img_dir}")
        
        # Initialize uploader
        uploader = PortfolioImageUploader()
        
        # Process portfolio
        uploader.process_portfolio(json_path, img_dir)
        
    except Exception as e:
        logger.error(f"Application failed: {str(e)}")
        raise

if __name__ == "__main__":
    main()
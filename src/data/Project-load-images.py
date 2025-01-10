import os
import json
import cloudinary
import cloudinary.uploader
from pathlib import Path
from typing import Dict, List, Union, Optional
import logging
from datetime import datetime

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f'portfolio_upload_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class PortfolioImageUploader:
    def __init__(self, cloud_name: str, api_key: str, api_secret: str):
        """Initialize the uploader with Cloudinary credentials."""
        self.configure_cloudinary(cloud_name, api_key, api_secret)
        
    @staticmethod
    def configure_cloudinary(cloud_name: str, api_key: str, api_secret: str) -> None:
        """Configure Cloudinary with provided credentials."""
        try:
            cloudinary.config(
                cloud_name=cloud_name,
                api_key=api_key,
                api_secret=api_secret
            )
            logger.info("Cloudinary configured successfully")
        except Exception as e:
            logger.error(f"Failed to configure Cloudinary: {str(e)}")
            raise

    @staticmethod
    def create_slug(title: str) -> str:
        """Create a URL-friendly slug from a title."""
        return (title.lower()
                .replace(" ", "-")
                .replace(":", "")
                .replace("(", "")
                .replace(")", "")
                .replace("&", "and")
                .replace("'", "")
                .replace('"', ""))

    def get_image_path(self, base_dir: str, image_path: str) -> str:
        """Convert relative image path to absolute path."""
        # Supprimer les préfixes de chemin courants
        for prefix in ['/public/', '/projects/', '/']:
            if image_path.startswith(prefix):
                image_path = image_path[len(prefix):]
        
        # Construire le chemin complet
        full_path = os.path.join(base_dir, image_path)
        return os.path.normpath(full_path)

    def upload_image(self, image_path: str, folder: str, public_id: Optional[str] = None) -> Optional[Dict]:
        """Upload a single image to Cloudinary and return the result."""
        try:
            if not os.path.exists(image_path):
                logger.warning(f"Image file not found: {image_path}")
                return None

            upload_params = {
                "folder": folder,
                "use_filename": True,
                "unique_filename": True,
            }
            
            if public_id:
                upload_params["public_id"] = public_id

            result = cloudinary.uploader.upload(image_path, **upload_params)
            logger.info(f"Successfully uploaded: {os.path.basename(image_path)}")
            return result
        except Exception as e:
            logger.error(f"Failed to upload {image_path}: {str(e)}")
            return None

    def process_project_images(self, project: Dict, img_dir: str) -> Dict:
        """Process all images for a single project."""
        try:
            # Ensure slug exists
            slug = project.get('slug') or self.create_slug(project['title'])
            project['slug'] = slug
            folder = f"portfolio/{slug}"

            logger.info(f"Processing project: {project['title']}")

            # Handle thumbnail
            if project.get('thumbnail'):
                thumbnail_path = self.get_image_path(img_dir, project['thumbnail'])
                if os.path.exists(thumbnail_path):
                    thumbnail_result = self.upload_image(thumbnail_path, folder)
                    if thumbnail_result:
                        project['thumbnail'] = thumbnail_result['secure_url']
                        logger.info(f"Updated thumbnail URL: {project['thumbnail']}")

            # Handle images array
            if 'images' in project and isinstance(project['images'], list):
                new_images = []
                for img in project['images']:
                    try:
                        if isinstance(img, dict):
                            img_path = self.get_image_path(img_dir, img['url'])
                            if os.path.exists(img_path):
                                result = self.upload_image(img_path, folder)
                                if result:
                                    new_img = {
                                        'url': result['secure_url'],
                                        'alt': img.get('alt', os.path.basename(img_path))
                                    }
                                    new_images.append(new_img)
                                    logger.info(f"Added image with URL: {new_img['url']}")
                        else:
                            img_path = self.get_image_path(img_dir, img)
                            if os.path.exists(img_path):
                                result = self.upload_image(img_path, folder)
                                if result:
                                    new_img = {
                                        'url': result['secure_url'],
                                        'alt': os.path.basename(img_path)
                                    }
                                    new_images.append(new_img)
                                    logger.info(f"Added image with URL: {new_img['url']}")
                    except Exception as e:
                        logger.error(f"Error processing image in project {project['title']}: {str(e)}")

                # Only update images if we have successfully processed some
                if new_images:
                    project['images'] = new_images
                    logger.info(f"Updated project {project['title']} with {len(new_images)} images")
                else:
                    logger.warning(f"No images were successfully processed for project {project['title']}")

            return project

        except Exception as e:
            logger.error(f"Error processing project {project.get('title', 'Unknown')}: {str(e)}")
            return project

    def process_portfolio(self, json_path: str, img_dir: str) -> None:
        """Process the entire portfolio JSON file."""
        try:
            # Load JSON data
            with open(json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Create a copy of the original projects
            updated_projects = []

            # Process each project
            for project in data['projects']:
                updated_project = self.process_project_images(project.copy(), img_dir)
                updated_projects.append(updated_project)

            # Update the projects in the data
            data['projects'] = updated_projects

            # Save updated JSON with timestamp
            output_path = os.path.join(
                os.path.dirname(json_path),
                f'updated_portfolio_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
            )
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Successfully saved updated JSON to: {output_path}")

        except Exception as e:
            logger.error(f"Failed to process portfolio: {str(e)}")
            raise

def main():
    """Main execution function."""
    try:
        # Configuration
        JSON_PATH = 'D:/my-portfolio-website/my-portfolio/src/data/projectData.json'
        IMG_DIR = 'D:/my-portfolio-website/my-portfolio/public/projects/'
        
        
        # Initialize uploader
        uploader = PortfolioImageUploader(
            cloud_name="medaminebelgareg",
            api_key="431675564161119",
            api_secret="fzN3IdZhacc05yiBG-dJbMWnS8w"
        )
        
        # Process portfolio
        uploader.process_portfolio(JSON_PATH, IMG_DIR)
        
    except Exception as e:
        logger.error(f"Application failed: {str(e)}")
        raise

if __name__ == "__main__":
    main()
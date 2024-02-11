## Garden of Eve API

GOE REST API is built using NodeJS with Express and MySQL as the backend for Garden of Eve ecommerce appplication. The GOE API currently deployed on AWS Elastic Beanstalk.

## Built with
* NodeJS 
* Express
 
## Database
* MySQL - store data
* Cloudinary - store images

## Sample
* GET Products - 
http://goerestapi-env-1.eba-endpnfax.ap-south-1.elasticbeanstalk.com/api/products?page=1&limit=3
```
{
    "success": 1,
    "data": {
        "current_page": 1,
        "total_pages": 17,
        "total_products": 51,
        "has_prev": false,
        "has_next": true,
        "products": [
            {
                "id": 1,
                "name": "African Mask Plant",
                "description": "Alocasia amazonica 'Polly' is a compact houseplant from the elephant ear family, known for its distinctive glossy leaves that conjure up images of an Amazonian jungle—despite not being from the Amazon (or any jungle, for that matter). Also known as the African mask plant, it's the most popular Alocasia grown indoors.",
                "sunlight": "Indirect",
                "watering": "3 - 4 times a week",
                "lifespan": "1 - 2 years",
                "size": "80 cm",
                "category": [
                    "Indoor"
                ],
                "qty": 20,
                "price": 1200,
                "img_directory": "Products/African_Mask_Plant_tqh2iq",
                "img_url": "https://res.cloudinary.com/dcseyuhyn/image/upload/v1659339521/Products/African_Mask_Plant_tqh2iq.png",
                "img_credit": "Photo by rawpixel.com on FreePik",
                "created_at": "2022-08-02 10:49:05",
                "modified_at": "2022-08-02 10:49:05",
                "discount": {
                    "id": 1,
                    "name": "Mid Year Sale!",
                    "description": " To celebrate the 6th month of the year",
                    "discount_percent": 10,
                    "created_at": "2022-07-14 17:04:28",
                    "modified_at": "2022-07-14 17:04:28"
                }
            },
            {
                "id": 2,
                "name": "African Spear Plant",
                "description": "The African spear plant (Sansevieria cylindrica), also known as the cylindrical snake plant, is a succulent that consists of upright, gray-green, subtly striped leaves. The leaves are cylindrical in shape but narrow to a point at their tips. When grown in optimal conditions, African spear plants might send up a long flower spike from their center that's full of tiny, delicate, white blooms. They are best planted at the start of the growing season in the spring, and they’re generally a slow-growing succulent.",
                "sunlight": "Full",
                "watering": "Every other week",
                "lifespan": "Perennial",
                "size": "4 – 6 ft",
                "category": [
                    "Indoor"
                ],
                "qty": 20,
                "price": 500,
                "img_directory": "Products/African_Spear_Plant_mofh61",
                "img_url": "https://res.cloudinary.com/dcseyuhyn/image/upload/v1659340384/Products/African_Spear_Plant_mofh61.png",
                "img_credit": "Photo by rawpixel.com on FreePik",
                "created_at": "2022-08-02 10:50:42",
                "modified_at": "2022-08-02 10:50:42",
                "discount": {
                    "id": 2,
                    "name": "Christmas Sale",
                    "description": "To celebrate Christmas Holiday. Ho ho ho",
                    "discount_percent": 70,
                    "created_at": "2022-07-14 17:05:54",
                    "modified_at": "2022-07-14 17:05:54"
                }
            },
            {
                "id": 3,
                "name": "Agave Palm Tree Plant",
                "description": "A group of succulent plants that thrive in areas with warm temperatures and full sun all day. Growers who live in areas with chilly winter temperatures typically grow the plant outdoors when the weather is nice and bring it indoors during winter.",
                "sunlight": "Full",
                "watering": "Every other week",
                "lifespan": "12 - 30 years",
                "size": "1 – 20 ft",
                "category": [
                    "Indoor",
                    "Succulent"
                ],
                "qty": 20,
                "price": 600,
                "img_directory": "Products/Agave_Palm_Tree_Plant_gvdoep",
                "img_url": "https://res.cloudinary.com/dcseyuhyn/image/upload/v1659339508/Products/Agave_Palm_Tree_Plant_gvdoep.png",
                "img_credit": "Photo by rawpixel.com on FreePik",
                "created_at": "2022-08-02 10:51:06",
                "modified_at": "2022-08-02 10:51:06"
            }
        ]
    }
}
```
* Also allows the following Query Parameters:
![image](https://user-images.githubusercontent.com/63276829/224927391-30be2dff-dea3-446c-a517-31fd50505960.png)

* GET User's Cart (Requires Token) - http://goerestapi-env-1.eba-endpnfax.ap-south-1.elasticbeanstalk.com/api/cart?id=3
```
{
    "success": 1,
    "data": {
        "current_page": 1,
        "total_pages": 1,
        "total_cart_items": 1,
        "has_prev": false,
        "has_next": false,
        "cart_items": [
            {
                "id": 2,
                "qty": 2,
                "created_at": "2022-07-13 10:51:25",
                "modified_at": "2022-07-13 10:51:25",
                "product_info": {
                    "id": 3,
                    "name": "Agave Palm Tree Plant",
                    "description": "A group of succulent plants that thrive in areas with warm temperatures and full sun all day. Growers who live in areas with chilly winter temperatures typically grow the plant outdoors when the weather is nice and bring it indoors during winter.",
                    "sunlight": "Full",
                    "watering": "Every other week",
                    "lifespan": "12 - 30 years",
                    "size": "1 – 20 ft",
                    "category": [
                        "Indoor",
                        "Succulent"
                    ],
                    "qty": 20,
                    "price": 600,
                    "img_directory": "Products/Agave_Palm_Tree_Plant_gvdoep",
                    "img_url": "https://res.cloudinary.com/dcseyuhyn/image/upload/v1659339508/Products/Agave_Palm_Tree_Plant_gvdoep.png",
                    "img_credit": "Photo by rawpixel.com on FreePik",
                    "created_at": "2022-08-02 10:51:06",
                    "modified_at": "2022-08-02 10:51:06"
                }
            }
        ]
    }
}
```
Invalid Token Response:
```
{
    "success": 0,
    "message": "Invalid Token"
}
```

#### Postman Collection
![image](https://user-images.githubusercontent.com/63276829/224926961-17bd108b-e9c3-4832-9819-83af7f7a613a.png)

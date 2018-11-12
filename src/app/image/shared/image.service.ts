import { Injectable } from '@angular/core'

@Injectable()
export class ImageService{
    visibleImages = [];

    getImages(){
        return this.visibleImages = IMAGES.slice(0);
    }

    getImage(id: number){
        return IMAGES.slice(0).find(image => image.id == id)
    }
}

const IMAGES =[
    {"id":1, "category": "Football", "caption": "Practice The Best Sport", "url":"assets/img/Football 1.jpg"},
    {"id":2, "category": "Football", "caption": "Make that Free Kick Count", "url":"assets/img/Football 2.jpg"},
    {"id":3, "category": "Football", "caption": "Shoooooottt", "url":"assets/img/Football 3.jpg"},
    {"id":4, "category": "Badminton", "caption": "Kim and Jessie", "url":"assets/img/Badminton 1.jpg"},
    {"id":5, "category": "Badminton", "caption": "View from the top", "url":"assets/img/Badminton 2.jpg"},
    {"id":6, "category": "Badminton", "caption": "On the trail", "url":"assets/img/Badminton 3.jpg"},
    {"id":7, "category": "BasketBall", "caption": "Cool water cavern", "url":"assets/img/Basketball 1.jpg"},
    {"id":8, "category": "BasketBall", "caption": "Sunset at the docks", "url":"assets/img/Basketball 2.png"},
    {"id":9, "category": "BasketBall", "caption": "Camping Trip '17'", "url":"assets/img/Basketball 3.jpg"},
    {"id":10, "category": "TableTennis", "caption": "Our camping spot", "url":"assets/img/TableTennis 1.jpg"},
    {"id":11, "category": "TableTennis", "caption": "RV Life", "url":"assets/img/TableTennis 2.png"},
    {"id":12, "category": "Cricket", "caption": "Hiking trip 2017", "url":"assets/img/Cricket 1.jpg"},
    {"id":13, "category": "Cricket", "caption": "Big library", "url":"assets/img/Cricket 2.jpg"},
    {"id":14, "category": "Cricket", "caption": "Stacks", "url":"assets/img/Cricket 3.jpg"},
    {"id":15, "category": "Zumba", "caption": "Saturday afternoon", "url":"assets/img/Zumba 1.jpeg"},
    {"id":16, "category": "Zumba", "caption": "Local library", "url":"assets/img/Zumba 2.jpg"},
    {"id":17, "category": "Zumba", "caption": "Nice library", "url":"assets/img/Zumba 3.jpg"},
    {"id":18, "category": "Volleyball", "caption": "Nice library", "url":"assets/img/volleyball 1.jpg"},
    {"id":19, "category": "Volleyball", "caption": "Nice library", "url":"assets/img/volleyball 2.jpg"},
    {"id":20, "category": "Volleyball", "caption": "Nice library", "url":"assets/img/volleyball 3.jpg"},
    {"id":21, "category": "Wall-Climbing", "caption": "Nice library", "url":"assets/img/Wall-Climbing 1.jpg"},
    {"id":22, "category": "Wall-Climbing", "caption": "Nice library", "url":"assets/img/Wall-Climbing 2.jpg"},
    {"id":23, "category": "Swimming", "caption": "Nice library", "url":"assets/img/Swimming 1.jpg"},
    {"id":24, "category": "Swimming", "caption": "Nice library", "url":"assets/img/Swimming 2.jpg"},
    {"id":25, "category": "Swimming", "caption": "Nice library", "url":"assets/img/Swimming 3.jpg"},
    {"id":26, "category": "Gymnasium", "caption": "Nice library", "url":"assets/img/Gymnasium 1.jpg"},
    {"id":27, "category": "Gymnasium", "caption": "Nice library", "url":"assets/img/Gymnasium 2.jpg"},
    {"id":28, "category": "Gymnasium", "caption": "Nice library", "url":"assets/img/Gymnasium 3.jpg"}
]

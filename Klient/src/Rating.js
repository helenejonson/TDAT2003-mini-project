import * as React from 'react';
import { Component } from 'react-simplified';
import {Head, Menu} from "./index";
import {AdvancedSearch} from "./widgets";
import {ArticleCard} from "./Card";
import {Article} from "./Article";
import {databaseService } from "./DatabaseService";
import {Comment} from "./Comments";

export class Rating{
    ratingId: number;
    articleId: number;
    likes: number;
    dislikes: number;

    constructor(ratingId: number, articleId: number, likes: number, dislikes: number){
        this.ratingId = ratingId;
        this.articleId = articleId;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}

export class Ratings extends Component<{ id: number } > {

    rating: Rating  = null;

    mounted(): void {
        databaseService.getRating(this.props.id).then(rating => (this.rating = rating))
    }

    render(){
        let rating = this.rating;
        console.log(this.rating);
        return (
            <div>
                <div className='rating'>
                    <p>Rating</p>
                    <button type="button" className="btn btn-success like" onClick={this.pushLike}>Like</button>
                    <button type="button" className="btn btn-danger dislike" onClick={this.pushDislike}>Dislike</button>
                    <p>Likes: {rating? rating.likes : 0}     Dislikes: {rating? rating.dislikes : 0}</p>

                </div>
            </div>
        );
    }

    pushLike(){
        this.rating.likes = this.rating.likes +1;
        databaseService.updateRating(this.rating)
            .catch(e => console.error(e));
    }

    pushDislike(){
        this.rating.dislikes = this.rating.dislikes + 1;
        databaseService.updateRating(this.rating)
            .catch(e => console.error(e));
    }
}

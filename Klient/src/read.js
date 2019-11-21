// @flow

import {Article} from "./Article";
import * as React from 'react';
import {Component} from 'react-simplified';
import MarkdownRenderer from 'react-markdown-renderer';
import {databaseService} from "./DatabaseService";
import {Comments} from "./Comments";
import {Delete} from "./delete";
import {Alert} from './widgets';
import {UpdateArticle} from './updateArticle';
import { NavLink } from "react-router-dom";


export class Read extends Component<{ match: { params: { id: number } } }> {

    article: Article  = null;

    mounted() {
        databaseService.getArticle(this.props.match.params.id).
        then(article => {
            if(article === null) {
                Alert.danger("Article does not exist");
            }else{
                (this.article = article)
            }})
          .catch((error: Error) => Alert.danger(error.message));
    }

    render(){
        let article = this.article;
        console.log(article);
        if(article) {
            return (
                <div>
                    <div class='readArticle'>
                        <h1 className='articleTitle'> {article.title} </h1>
                        <figure>
                            <img className='pictureSize' src={article.picturePath} alt={article.pictureAlt}/>
                            <figcaption className='pictureCapt'>{article.pictureCapt}</figcaption>
                        </figure>
                        <br/>
                        {/* for å gi oss formatert versjon av teksten */}
                        <MarkdownRenderer markdown={article.text}/>
                        <br/>
                        <div className= 'articleInfo'>
                            <small> Author: {article.author}</small>
                            <br/>
                            <small> Category: {article.category}</small>
                            <br/>
                            <small> Published: {article.date.toLocaleString()}</small>
                        </div>
                        <br/>
                        <div className='rating'>
                            <p>Rating</p>
                            <button type="button" className="btn btn-success like" onClick={this.pushLike}>Like</button>
                            <button type="button" className="btn btn-danger dislike" onClick={this.pushDislike}>Dislike</button>
                            <p>Likes: {article.likes}     Dislikes: {article.dislikes}</p>

                        </div>
                        <Comments id={this.props.match.params.id}/>

                        <Delete id={this.props.match.params.id}/>

                        <NavLink className="nav-link" style={{color: 'blue'}} activeStyle={{ color: "gray" }} to={"/Article/" + this.props.match.params.id + "/update"}>
                            Update Article
                        </NavLink>
                    </div>
                </div>
            );
        }else{
            return(
              <div>
                  <h1 className="categoryTitle">
                      Loading... please stand by
                  </h1>
              </div>
            )

        }
    }

    pushLike(){
        this.article.likes = this.article.likes +1;
        databaseService.updateRating(this.article)
            .catch(e => console.error(e));
    }

    pushDislike(){
        this.article.dislikes = this.article.dislikes + 1;
        databaseService.updateRating(this.article)
            .catch(e => console.error(e));
    }
}
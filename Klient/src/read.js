// @flow

import {Article} from "./Article";
import * as React from 'react';
import {Component} from 'react-simplified';
import MarkdownRenderer from 'react-markdown-renderer';
import {Menu} from "./index";
import {databaseService} from "./DatabaseService";

export class Read extends Component<{ match: { params: { id: number } } }> {

    article: Article  = null;

    mounted(): void {
        databaseService.getArticle(this.props.match.params.id).then(article => (this.article = article))
    }

    render(){
        let article = this.article;
        if(article) {
            return (
                <div>
                    <Menu/>
                    <div class='readArticle'>
                        <h1> {article.title} </h1>
                        <figure>
                            <img src={article.picturePath} alt={article.pictureAlt}/>
                            <figcaption>{article.pictureCapt}</figcaption>
                        </figure>
                        {/* for å gi oss formatert versjon av teksten */}
                        <MarkdownRenderer markdown={article.text}/>
                        <p> {article.tags} </p>
                        <p> {article.date.toDateString()}</p>
                        <p> {article.author}</p>
                        <div className="kommentarer">
                            <h3>Comments</h3>
                            <div className='comment'>
                                <button className='newComment'>Ny kommentar</button>
                                <div className="kommentar">
                                    <h4>Ola Nordman</h4>
                                    <p>Duis varius hendrerit sem, nec ornare mauris interdum at.</p>
                                </div>
                                <div className="kommentar">
                                    <h4>Kari Nordman</h4>
                                    <p>Quisque dignissim tortor nunc, sit amet consectetur mi iaculis eu.</p>
                                </div>
                                <button>Flere kommentarer</button>
                            </div>
                        </div>
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
}
// @flow

import {Article, articleService} from "./Article";
import * as React from 'react';
import {Component} from 'react-simplified';
import MarkdownRenderer from 'react-markdown-renderer';
import {Menu} from "./index";


let tekst = '**Lorem ipsum dolor sit amet**, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Quam vulputate dignissim suspendisse in. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Ultricies mi eget mauris pharetra et. In hendrerit gravida rutrum quisque non tellus. Diam maecenas sed enim ut. Suspendisse in est ante in nibh mauris cursus. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Amet est placerat in egestas.\n' +
    '\n' +
    'Amet nisl purus in mollis nunc sed id semper risus. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Volutpat ac tincidunt vitae semper quis lectus nulla at. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Purus non enim praesent elementum facilisis. At tempor commodo ullamcorper a lacus. Magna fringilla urna porttitor rhoncus dolor. Fermentum et sollicitudin ac orci phasellus egestas tellus. Nunc consequat interdum varius sit amet mattis vulputate enim. Ac felis donec et odio. Neque egestas congue quisque egestas. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula.\n' +
    '\n' +
    'Tincidunt dui ut ornare lectus sit. Convallis aenean et tortor at risus viverra adipiscing. Tortor posuere ac ut consequat semper viverra nam. Felis eget velit aliquet sagittis. Ultricies tristique nulla aliquet enim. Nisl nisi scelerisque eu ultrices. Non quam lacus suspendisse faucibus. At quis risus sed vulputate odio. Felis eget nunc lobortis mattis aliquam. Id aliquet risus feugiat in ante metus dictum at tempor. Consectetur adipiscing elit ut aliquam purus. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Aliquet sagittis id consectetur purus. Nibh sit amet commodo nulla facilisi nullam vehicula. Imperdiet proin fermentum leo vel orci porta. Eget gravida cum sociis natoque penatibus et magnis dis.\n' +
    '\n' +
    'Ultrices dui sapien eget mi. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Tortor at auctor urna nunc. Proin sed libero enim sed. Vulputate ut pharetra sit amet aliquam id. Cras ornare arcu dui vivamus arcu felis bibendum. Et malesuada fames ac turpis. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Egestas dui id ornare arcu odio. Lorem sed risus ultricies tristique. Sem et tortor consequat id. Ut porttitor leo a diam sollicitudin. Suscipit adipiscing bibendum est ultricies. Massa tempor nec feugiat nisl. Luctus venenatis lectus magna fringilla urna porttitor. Lacus vel facilisis volutpat est velit egestas. Orci a scelerisque purus semper eget duis. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Senectus et netus et malesuada. Arcu non sodales neque sodales.'


export class Read extends Component<{ match: { params: { id: number } } }> {

    article: Article  = new Article(4,'Skogbrann på kalvskinnet', "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "Bildet viser en brennende skog", 'Skogen på kalvskinnet allè brenner', tekst, new Date(), 'Kult + Tore');

    mounted(): void {
        articleService.getArticle(this.props.match.params.id).then(article => (this.article = article))
    }

    render(){
        let article = this.article;
        return(
            <div>
                <Menu/>
                <div class= 'readArticle'>
                    <h1> {article.title} </h1>
                    <figure>
                        <img src={article.picturePath} alt={article.pictureAlt} />
                            <figcaption>{article.pictureCapt}</figcaption>
                    </figure>
                    {/* for å gi oss formatert versjon av teksten */}
                    <MarkdownRenderer markdown={article.text} />
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
    }
}
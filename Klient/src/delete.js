// @flow
import * as React from 'react';
import {Component} from 'react-simplified';
import {databaseService} from "./DatabaseService";
import {createHashHistory} from 'history';

const history = createHashHistory();


export class Delete extends Component<{ id: number } > {

    render(){

        return (
            <div>
                <p>
                    <button className="btn delete" type="button" data-toggle="collapse"
                            data-target="#collapseDelete" aria-expanded="false" aria-controls="collapseDelete">
                        Delete Article
                    </button>
                </p>
                <div className="collapse" id="collapseDelete">
                    <h8> This removes the article from the database and it can not be recovered.</h8>
                    <p> Are you sure you want to delete this article?</p>
                    <button className="btn delete" type="button" data-toggle="collapse" onClick={this.articleDelete} >
                        I am sure. Delete article
                    </button>
                </div>
            </div>
        );
    }

    articleDelete(){

        databaseService.deleteArticle(this.props.id).then(
            history.push('/')
        )
            .catch(e => console.error(e));
    }
}
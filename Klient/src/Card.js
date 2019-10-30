import * as React from 'react';
import { Component } from 'react-simplified';
import {NavLink} from "react-router-dom";
import {Article} from "./Article";


export class ArticleCard extends Component<{ art: Article }> {
    render() {
        return (
            <div className="card" style={{ height:'auto', overflow:'hidden', margin:10+'px' }}>
                <img src={this.props.art.picturePath} alt={this.props.art.pictureAlt}/>

                <div className="card-body" style={{padding:20 + 'px'}}>
                    <h5 className="card-title">
                        <NavLink style={{color: 'black'}} activeStyle={{ color: 'gray' }} to={"/Article/" + this.props.art.id}>
                            {this.props.art.title}
                        </NavLink></h5>
                    <div className="card-text">{this.props.art.date.getDay()}/{this.props.art.date.getMonth()}/{this.props.art.date.getFullYear()}</div>
                </div>
            </div>
        );
    }
}




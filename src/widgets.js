// @flow


import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {Menu} from './index';


var categories = ['Movies', 'Books', 'New', 'MTG', 'D&D', 'Anime'];

var tags = ["Fantasy","Strategy","Co-op", "Single-player", "tags", "new tag", "another tag", "last tag"];


export class AdvancedSearch extends Component{

    // to make flow shut up
    blabla: { style: CSSStyleDeclaration } = {};


    collapse(){
        let bredde = this.blabla.style.width;
        console.log(bredde);

        if(bredde === '0px'){
            this.blabla.style.width = "100%";
        } else {

            this.blabla.style.width = "0";
        }

    }

    render(){
        return (
            <div>
                <p>
                    <button onClick={this.collapse}>Open/Close</button>
                </p>
                <div className="advancedSearch" ref={e => this.blabla = e}>
                    <h3>Advanced Search </h3>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Skriv tekst her" aria-label="Search"/>
                    </div>
                    <h4>Kategori</h4>
                    {categories.map(tag => (
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">{tag}</label>
                        </div>
                    ))}
                    <h4>Dato</h4>
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Fra dato"/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Til dato"/>
                            </div>
                        </div>
                    </form>
                    <h2>Tags</h2>
                    {tags.map(tag => (
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">{tag}</label>
                        </div>
                    ))}
                    <br/>
                    <button type="button" className="btn btn-primary">Lagre søk</button>
                </div>

            </div>
        );
    }
}

export class AdvancedSearch2 extends Component{

    // to make flow shut up
    blabla: { style: CSSStyleDeclaration } = {};



    render(){
        return (
            <div>
                <Menu/>
                <div className="advancedSearch" ref={e => this.blabla = e}>
                    <h3>Advanced Search </h3>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Skriv tekst her" aria-label="Search"/>
                    </div>
                    <h4>Kategori</h4>
                    {categories.map(tag => (
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">{tag}</label>
                        </div>
                    ))}
                    <h4>Dato</h4>
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Fra dato"/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Til dato"/>
                            </div>
                        </div>
                    </form>
                    <h2>Tags</h2>
                    {tags.map(tag => (
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">{tag}</label>
                        </div>
                    ))}
                    <br/>
                    <button type="button" className="btn btn-primary">Lagre søk</button>
                </div>

            </div>
        );
    }
}






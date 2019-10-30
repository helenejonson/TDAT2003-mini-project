// @flow


import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {Menu} from './index';
import {CategoryList} from "./Category";

var categories = CategoryList().map(e => e.name);

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
                    <h4>Date</h4>
                    <h7>Write in fromat YYYY-MM-DD</h7>
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="From date"/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="From date"/>
                            </div>
                        </div>
                    </form>
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
                <div className="advancedSearch2" ref={e => this.blabla = e}>
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
                    <h4>Date</h4>
                    <h7>Write in fromat YYYY-MM-DD</h7>
                    <form>
                        <div className="form-row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="From date"/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="From date"/>
                            </div>
                        </div>
                    </form>
                    <br/>
                    <button type="button" className="btn btn-primary">Lagre søk</button>
                </div>

            </div>
        );
    }
}






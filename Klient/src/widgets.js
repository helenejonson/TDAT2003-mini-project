// @flow


import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {categoryList} from "./Category";

var categories = categoryList.categories.map(e => e.name);

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

export class Alert extends Component {
    alerts: { id: number, text: React.Node, type: string }[] = [];
    static nextId = 0;

    render() {
        return (
          <>
              {this.alerts.map((alert, i) => (
                <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
                    {alert.text}
                    <button
                      type="button"
                      className="close"
                      onClick={() => {
                          this.alerts.splice(i, 1);
                      }}
                    >
                        &times;
                    </button>
                </div>
              ))}
          </>
        );
    }
    static success(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'success' });
        });
    }

    static info(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'info' });
        });
    }

    static warning(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'warning' });
        });
    }

    static danger(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'danger' });
        });
    }
}







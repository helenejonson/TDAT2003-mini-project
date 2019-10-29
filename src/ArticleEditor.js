// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Article} from "./Article";
import {Menu}  from './index';
import {CategoryList} from "./Category";


var categories = CategoryList().map(e => e.name);



export class ArticleEditor extends Component<{ match: { params: { id: number } } }> {
  article: Article = new Article(
      1,
    'Title',
    'img/logo.png',
    'an eagle',
    'lol',
    '',
    new Date(),
    'somebody'
  );

  render() {
    return (
      <div className="card">
        <Menu/>
        <div className="card-body">
      <form>
        {/*====== title ======*/}
        <div className="form-group">
          <div className="row">
            <label htmlFor="title" className="col-sm-1 col-form-label col-form-label-lg">Title</label>
            <div className="col-sm-8">
              <input id="title" className="form-control form-control-lg" type="text" placeholder="Your wonderful title" aria-describedby="titleHelp"/>
              <small id="titleHelp" className="form-text text-muted">Please pick a catchy title that fits the content of your article</small>
            </div>
          </div>
        </div>
        {/*====== image (needs image preview) ======*/}
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="imgSpan">Upload</span>
            </div>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="imgFile"
                     onChange={event => (this.article.picturePath = URL.createObjectURL(event.target.files[0]))}
                     aria-describedby="imgSpan" />
                <label className="custom-file-label" htmlFor="imgFile">Choose a suitable image</label>
            </div>
          </div>
          {/*====== image preview ======*/}
          <div className="card align-items-center p-3 text-center">
            <img src={this.article.picturePath} className="card-img w-25" alt="[ Preview ]"/>
          </div>
          <p></p>{/* shitty hack */}
          <div className="row">
            <label htmlFor="imgAlt" className="col col-form-label">Alt-Text</label>
            <div className="col-11">
              <input id="imgAlt" className="form-control" type="text" placeholder="Image content description" aria-describedby="imgAltHelp"/>
              <small id="imgAltHelp" className="form-text text-muted">An alt-text will let people with bad vision get an idea of what it depicts (or if it does not load)</small>
            </div>
          </div>
          <p></p>{/* shitty hack */}
          <div className="row">
            <label htmlFor="imgCapt" className="col col-form-label">Image Caption</label>
            <div className="col-11">
              <input id="imgCapt" className="form-control"
                     type="text" placeholder="Image caption"
                     onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.pictureCapt = event.target.value)}
                     aria-describedby="imgCaptHelp"/>
              <small id="imgCaptHelp" className="form-text text-muted">Please provide a caption for your image, containing further details</small>
            </div>
          </div>
        </div>
        {/*====== markdown text ======*/}
        <div className="form-group">
          <SimpleMDE onChange={this.handleMarkdownChange} label="Main text" options={{spellChecker: false}} />
        </div>
        {/*====== category and tags ======*/}
        <div className="form-row">
          <div className="col-2">
            <label htmlFor="category">Category</label>
            <select className="custom-select" id="category">
              <option selected>Select category...</option>
              {categories.map(e =>(
                        <option value='1'>{e}</option>
                  )
              )}
            </select>
          </div>
        </div>
        <div className='importance'>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" htmlFor="inlineCheckbox1">Important?</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
        </div>
      </div>
    );
  }

  handleMarkdownChange(value: string) {
    this.article.text = value;
  }
}
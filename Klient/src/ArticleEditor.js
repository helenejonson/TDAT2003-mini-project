// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Article} from "./Article";
import {Menu}  from './index';
import {Category, categoryList} from "./Category";
import {databaseService} from "./DatabaseService";
import {createHashHistory} from 'history';


const history = createHashHistory();




var categories: Category[] = categoryList.categories;



export class ArticleEditor extends Component<{ match: { params: { id: number } } }> {
  article: Article = new Article(
      1,
    'Title',
    'img/logo.png',
    'an eagle',
    'lol',
    '',
    new Date(),
    'somebody',
      'D&D',
      1,
      0,
      0
  );

  render() {
    return (
      <div className="card">
        <div className="card-body">
      <form>
        {/*====== title ======*/}
        <div className="form-group">
          <div className="row">
            <label htmlFor="title" className="col-sm-1 col-form-label col-form-label-lg">Title</label>
            <div className="col-sm-8">
              <input id="title" className="form-control form-control-lg" type="text" placeholder="Your wonderful title" aria-describedby="titleHelp"
                     onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.title = event.target.value)}/>
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
            <div className="row">
                <label htmlFor="imgPath" className="col col-form-label">Image path from web</label>
                <div className="col-11">
                    <input id="imgPath" className="form-control"
                           type="text" placeholder="Image path"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.picturePath = event.target.value)}
                           aria-describedby="imgPathHelp"/>
                    <small id="imgCaptHelp" className="form-text text-muted">Please provide a caption for your image, containing further details</small>
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
              <input id="imgAlt" className="form-control" type="text" placeholder="Image content description" aria-describedby="imgAltHelp"
                     onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.pictureAlt = event.target.value)}/>
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
        {/*author*/}
        <div className="row">
          <label htmlFor="imgCapt" className="col col-form-label">Author</label>
          <div className="col-11">
          <input id="author" className="form-control"
                 type="text" placeholder="Name of author"
                 onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.author = event.target.value)}
                 aria-describedby="authorHelp"/>
          <small id="authorHelp" className="form-text text-muted">Hwo are you?</small>
          </div>
        </div>
        {/*====== category======*/}
        <div className="form-row">
          <div className="col-2">
            <label htmlFor="category">Category</label>
            <select className="custom-select" id="category" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              if(event.target.value) this.article.category = categories[event.target.value -1].name
            }}>
              <option selected>Select category...</option>
              {categories.map((e,i) =>(
                        <option value={i+1} >{e.name}</option>
                  )
              )}
            </select>
          </div>
        </div>
        <div className="row">
          <label htmlFor="importance" className="col col-form-label">Importance</label>
          <div className="col-11">
            <input id="importance" className="form-control"
                   type="text" placeholder="1 or 2"
                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.article.importance = event.target.value)}
                   aria-describedby="importanceHelp"/>
            <small id="imgCaptHelp" className="form-text text-muted">1 = important, 2 = not important</small>
          </div>
        </div>
        <div className='importance'>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" htmlFor="inlineCheckbox1 ">Important?</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleUpload}>Upload</button>
      </form>
        </div>
      </div>
    );
  }

  handleMarkdownChange(value: string) {
    this.article.text = value;
  }

  handleUpload(){
    console.log(this.rating);
    databaseService.addArticle(this.article)
        .catch(e => console.error(e));
  }
}



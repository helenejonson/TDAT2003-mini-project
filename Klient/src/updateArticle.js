import { Article } from './Article';
import * as React from 'react';
import { Component } from 'react-simplified';
import MarkdownRenderer from 'react-markdown-renderer';
import { databaseService } from './DatabaseService';
import { Alert } from './widgets';
import SimpleMDE from 'react-simplemde-editor';
import { createHashHistory } from 'history';
import { Category, categoryList } from './Category';

const history = createHashHistory();

var categories: Category[] = categoryList.categories;

export class UpdateArticle extends Component<{ match: { params: { id: number } } }> {
  article: Article = null;

  mounted() {
    databaseService
      .getArticle(this.props.match.params.id)
      .then(article => {
        if (article === null) {
          Alert.danger('Article does not exist');
        } else {
          this.article = article;
        }
      })
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    console.log(this.props.match.params.id);
    let article = this.article;
    console.log(article);
    if (article) {
      return (
        <div>
          <div className="card">
            <div className="card-body">
              <form>
                {/*====== title ======*/}
                <div className="form-group">
                  <div className="row">
                    <label htmlFor="title" className="col-sm-1 col-form-label col-form-label-lg">
                      Title
                    </label>
                    <div className="col-sm-8">
                      <input
                        id="title"
                        className="form-control form-control-lg"
                        type="text"
                        aria-describedby="titleHelp"
                        value={this.article.title}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                          (this.article.title = event.target.value)
                        }
                      />
                      <small id="titleHelp" className="form-text text-muted">
                        Please pick a catchy title that fits the content of your article
                      </small>
                    </div>
                  </div>
                </div>
                {/*====== image (needs image preview) ======*/}
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="imgSpan">
                        Upload
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="imgFile"
                        onChange={event => (this.article.picturePath = URL.createObjectURL(event.target.files[0]))}
                        aria-describedby="imgSpan"
                      />
                      <label className="custom-file-label" htmlFor="imgFile">
                        Choose a suitable image
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="imgPath" className="col col-form-label">
                      Image path from web
                    </label>
                    <div className="col-11">
                      <input
                        id="imgPath"
                        className="form-control"
                        type="text"
                        value={this.article.picturePath}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                          (this.article.picturePath = event.target.value)
                        }
                        aria-describedby="imgPathHelp"
                      />
                      <small id="imgCaptHelp" className="form-text text-muted">
                        Please provide a caption for your image, containing further details
                      </small>
                    </div>
                  </div>
                  {/*====== image preview ======*/}
                  <div className="card align-items-center p-3 text-center">
                    <img src={this.article.picturePath} className="card-img w-25" alt="[ Preview ]" />
                  </div>
                  <p></p>
                  {/* shitty hack */}
                  <div className="row">
                    <label htmlFor="imgAlt" className="col col-form-label">
                      Alt-Text
                    </label>
                    <div className="col-11">
                      <input
                        id="imgAlt"
                        className="form-control"
                        type="text"
                        value={this.article.pictureAlt}
                        aria-describedby="imgAltHelp"
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                          (this.article.pictureAlt = event.target.value)
                        }
                      />
                      <small id="imgAltHelp" className="form-text text-muted">
                        An alt-text will let people with bad vision get an idea of what it depicts (or if it does not
                        load)
                      </small>
                    </div>
                  </div>
                  <p></p>
                  {/* shitty hack */}
                  <div className="row">
                    <label htmlFor="imgCapt" className="col col-form-label">
                      Image Caption
                    </label>
                    <div className="col-11">
                      <input
                        id="imgCapt"
                        className="form-control"
                        type="text"
                        value={this.article.pictureCapt}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                          (this.article.pictureCapt = event.target.value)
                        }
                        aria-describedby="imgCaptHelp"
                      />
                      <small id="imgCaptHelp" className="form-text text-muted">
                        Please provide a caption for your image, containing further details
                      </small>
                    </div>
                  </div>
                </div>
                {/*====== markdown text ======*/}
                <div className="form-group">
                  <SimpleMDE
                    onChange={this.handleMarkdownChange}
                    label="Main text"
                    value={this.article.text}
                    options={{ spellChecker: false }}
                  />
                </div>
                {/*author*/}
                <div className="row">
                  <label htmlFor="imgCapt" className="col col-form-label">
                    Author
                  </label>
                  <div className="col-11">
                    <input
                      id="author"
                      className="form-control"
                      type="text"
                      value={this.article.author}
                      onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                        (this.article.author = event.target.value)
                      }
                      aria-describedby="authorHelp"
                    />
                    <small id="authorHelp" className="form-text text-muted">
                      Hwo are you?
                    </small>
                  </div>
                </div>
                {/*====== category======*/}
                <div className="form-row">
                  <div className="col-2">
                    <label htmlFor="category">Category</label>
                    <select
                      className="custom-select"
                      id="category"
                      onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                        if (event.target.value) this.article.category = categories[event.target.value - 1].name;
                      }}
                    >
                      <option selected>{this.article.category}</option>
                      {categories.map((e, i) => (
                        <option value={i + 1}>{e.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="importance">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                      onClick={this.setImportance}
                    />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">
                      Important?
                    </label>
                  </div>
                </div>
                <br />
                {/*The dropdown preview display*/}
                <div>
                  <p>
                    <button
                      className="btn preview-btn"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapsePreview"
                      aria-expanded="false"
                      aria-controls="collapsePreview"
                    >
                      Preview
                    </button>
                  </p>
                  <div className="collapse" id="collapsePreview">
                    <div className="preview">
                      <div className="mini-article">
                        <h4 className="articleTitle"> {this.article.title} </h4>
                        <figure>
                          <img
                            className="pictureSizePreview"
                            src={this.article.picturePath}
                            alt={this.article.pictureAlt}
                          />
                          <figcaption className="pictureCapt">{this.article.pictureCapt}</figcaption>
                        </figure>
                        <br />
                        <MarkdownRenderer markdown={this.article.text} />
                        <br />
                        <div className="articleInfo">
                          <small> Author: {this.article.author}</small>
                          <br />
                          <small> Category: {this.article.category}</small>
                          <br />
                          <small> Published: {this.article.date.toLocaleString()}</small>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleUpdate}>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="categoryTitle">Loading... please stand by</h1>
        </div>
      );
    }
  }

  setImportance() {
    var x = document.getElementById('inlineCheckbox1').checked;
    if (x) {
      this.article.importance = 1;
      console.log(this.article.importance);
    } else {
      this.article.importance = 2;
      console.log(this.article.importance);
    }
  }

  handleMarkdownChange(value: string) {
    this.article.text = value;
  }

  handleUpdate() {
    console.log(this.article);
    databaseService.updateArticle(this.article).then(history.push('/category/' + this.article.category)).catch(e => console.error(e));
  }
}

import React, {Component} from 'react';

export default class HomePage extends Component {

  /*
   <head>
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>StoryTime Story Reader</title>
   <link rel="stylesheet" href="bootstrap.min.css" />
   <link rel="stylesheet" href="Features-Boxed.css" />
   <link rel="stylesheet" href="Footer-Basic.css" />
   <link rel="stylesheet" href="Navigation-with-Search1.css" />
   <link rel="stylesheet" href="styles.css" />
   </head>
   */

  renderNav = () => {
    return (
      <nav className="navbar navbar-default navigation-clean-search">
        <div className="container">
          <div className="navbar-header"><a className="navbar-brand navbar-link" href="#">Choose
            Your Destiny</a>
            <button className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span
              className="icon-bar"/><span className="icon-bar"/><span
              className="icon-bar"/></button>
          </div>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav">
              <li className="active" role="presentation"><a href="#">Home </a></li>
              <li role="presentation"><a href="#">Find a Story</a></li>
              <li role="presentation"><a href="#">Read a Story</a></li>
              <li role="presentation"><a href="#">Write a Story</a></li>
            </ul>
            <form className="navbar-form navbar-left" target="_self">
              <div className="form-group">
                <label className="control-label" for="search-field"><i
                  className="glyphicon glyphicon-search"/></label>
                <input className="form-control search-field" type="search" name="search"
                       id="search-field"/>
              </div>
            </form>
            <a className="btn btn-default navbar-btn navbar-right action-button" role="button"
               href="#">Search </a></div>
        </div>
      </nav>
    )
  };

  renderIntro = (homeImage) => {
    return (
      <div className="row section-spacing">
        <div className="col-md-12"><img src={ homeImage } width="100%"/></div>
      </div>
    )
  };

  renderFeatureStories = () => {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">The Wistful Wizard of the Wonders, WOW!</h3></div>
              <div className="panel-body">
                <p className="storycard__title">by Mr. Wizard</p>
                <p>This is a charming little story that will have you guess at every turn. This
                  might be your lucky day.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">The Ocean World of Jacques Cousteau</h3></div>
              <div className="panel-body">
                <p className="storycard__title">by Jacques Cousteau</p>
                <p>This description is a bit rambly and does go on and on and on a bit until you
                  really wonder if there&#39;s any point to what you are reading and you might
                  just stop except that it might get GOOD at some point and so you continue
                  to read hoping all the while for a spectacular payoff, which at this point
                  would have to be pretty good to have been worth it.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Paralleliverse </h3></div>
              <div className="panel-body">
                <p className="storycard__title">by bubbabubbagump</p>
                <p>Choose this adventure. That would be the first correct choice you made.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">The Ocean World of Jacques Cousteau</h3></div>
              <div className="panel-body">
                <p className="storycard__title">by Jacques Cousteau</p>
                <p>This description is a bit rambly and does go on and on and on a bit until you
                  really wonder if there&#39;s any point to what you are reading and you might
                  just stop except that it might get GOOD at some point and so you continue
                  to read hoping all the while for a spectacular payoff, which at this point
                  would have to be pretty good to have been worth it.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">The Wistful Wizard of the Wonders, WOW!</h3></div>
              <div className="panel-body">
                <p className="storycard__title">by Mr. Wizard</p>
                <p>This is a charming little story that will have you guess at every turn. This
                  might be your lucky day.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4"/>
        </div>
      </div>
    )
  };

  renderFooter = () => {
    return (
      <div className="footer-basic">
        <footer>
          <div className="social"><a href="#"><i className="icon ion-social-instagram"/></a><a
            href="#"><i className="icon ion-social-snapchat"/></a><a href="#"><i
            className="icon ion-social-twitter"/></a><a href="#"><i
            className="icon ion-social-facebook"/></a></div>
          <ul className="list-inline">
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
          <p className="copyright">AJE Games © 2012-2017</p>
        </footer>
      </div>
    )
  };

  render() {
    const homeImage = 'https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg?h=350&amp;auto=compress&amp;cs=tinysrgb';
    return (
      <div>
        { this.renderNav() }
        <div className="container">
          { this.renderIntro(homeImage) }
          { this.renderFeatureStories() }
        </div>
        { this.renderFooter() }
      </div>
    )
  }
}
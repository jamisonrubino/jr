import React, { Component } from 'react';
import aboutData from './aboutData'

export default class About extends Component {
  render() {
    const title = aboutData.aboutSections[0].title,
      skills = aboutData.aboutSections[0].skills,
      education = aboutData.aboutSections[1].education.map((track,i)=>{
        if (track.indexOf(":") > -1)
          track = [track.slice(0, track.indexOf(":")), track.slice(track.indexOf(":"))]
        if (Array.isArray(track)) {
          return <h4 className="education__h4"><b>{track[0]}</b>{track[1]}</h4>
        } else {
          return <h4 className="education__h4">{track}</h4>
        }
        }),
      width = window.innerWidth,
      height = window.innerHeight,
      path = aboutData.aboutSections[2].path.map((p,i) => <blockquote className="personal__path__p" key={i}>{p}</blockquote>),
      titleSkillsBackgroundStyle = aboutData.aboutSections[0].style,
      educationBackgroundStyle = aboutData.aboutSections[1].style,
      personalPathBackgroundStyle = aboutData.aboutSections[2].style



      return (
        <div className="div__about">

          <section className="title__skills">
            <div className="title__skills__background" style={titleSkillsBackgroundStyle}></div>
            <div className="title__skills__content">
              <h2 className="title__skills__heading">Skills</h2>
              <h2 className="title__h2">
                {title}
              </h2>
              <h4 className="skills__h4">
                {skills}
              </h4>
            </div>
          </section>

          <section className="education">
            <div className="education__background" style={educationBackgroundStyle}></div>
            <div className="education__content">
              <h2 className="education__heading">Education</h2>
              {education}
            </div>
          </section>

          <section className="personal__path">
            <div className="personal__path__background" style={{...personalPathBackgroundStyle, "backgroundSize": (width > height ? "100% auto" : "auto 100%")}}></div>
            <div className="personal__path__content">
              <h2 className="personal__path__heading">My Path</h2>
              {path}
            </div>
          </section>
        </div>
      );
  }
}

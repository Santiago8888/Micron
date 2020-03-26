import React, { Fragment } from "react"


const HERO_COLOR = '#000'
const TITLE_STYLE = { marginBottom:20}
const TITLE_CLASS = "title is-1 is-semibold is-spaced main-title"
const subtitle_props = size => ({ className:`subtitle is-${size} is-light is-thin`, style:{color:HERO_COLOR, fontWeight:600}})
export const Hero = ({ src, titles, subtitle, children }) => <Fragment>
    <section className="hero" style={{height: '100vh', backgroundImage:`url(${src})`, opacity:0.8}}>
        <div className="hero-body" style={{paddingTop: '30vh', height: '100vh', paddingLeft:'10%'}}>
            <h1 className={TITLE_CLASS}  style={TITLE_STYLE}> 
                <span style={{fontSize:'4rem', color:HERO_COLOR}}> {titles[0]} </span><br/>
                <span style={{color:HERO_COLOR}}> {titles[1]} </span> 
            </h1>
            <h2 { ...subtitle_props(3) }> { subtitle } </h2>
            { children }
        </div>
    </section>
</Fragment>


export const NavBar = () => <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item">  Mircron </a>
    </div>
</nav>

import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      {/* Háttérvideó */}
      <div className="about-video-container">
        <video className="about-video-background" autoPlay loop muted playsInline>
          <source src="/rolunk.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Tartalom */}
      <div className="about-content">
        <h1>Üdvözlünk az oldalunkon!</h1>
        <p>Az OPIUM GYM egy olyan különleges jelenség amit garantáltan nem láttál még. </p>
        <p>Mi egy jó közösséget nyújtunk akiknek egy a céljuk ugyan az, a fejlődés.Amikor terveztük mit szeretnénk csinálni eszünkbe jutott hogy a nagy 2025ben mindenki szeretné magából a legjobbat kihozni.Kigondoltunk egy koncepciót és megvalósítottuk,így született az OPIUM GYM.Ami egy edzőterem saját OPIUM stílussal.</p>
        <p>A weboldalunkon a TOUR felület körbetekinthetsz az edzőtermünkben</p>
        <p>A Merch részben saját stílusú ruhákat tudsz rendelni,ami szerintünk adhat motivációt az edzéshez!</p>
        <p>Segítünk a helyes edzésben és hasznos trükkökben a VIDEOS felületen ahol Youtube csatornán több mint 500 videóbol keresgélhetsz.</p>
        <p>Nyugodtan regisztrálj be és legyél a csapat tagja!</p>
      </div>
    </div>
  );
}

export default About;

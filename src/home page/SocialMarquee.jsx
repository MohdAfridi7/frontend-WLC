import React from "react";





const SocialMarquee = () => {
  return (
    <section className="marquee">
      <div className="marquee-track">
        {[...Array(8)].map((_, i) => (
          <React.Fragment key={i}>
            <a
              href="https://www.linkedin.com/company/worldleadersconsortium/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LINKEDIN
            </a>

            <a
              href="https://www.facebook.com/people/World-Leaders-Consortium/61575084506451/?rdid=pn8oSnBs4xREIyPP&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F194icukuCi%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              FACEBOOK
            </a>

            <a
              href="https://www.instagram.com/worldleadersconsortium?igsh=Ym40cHUwNTU2eDg3"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              INSTAGRAM
            </a>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default SocialMarquee;
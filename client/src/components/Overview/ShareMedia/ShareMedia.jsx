import react from 'react';

export default function ShareMedia({ styles, selectedStyleId }) {
  let siteLink = window.location.origin.split(':').join('%3A').split('/').join('%2F');
  let stylePhoto = styles[selectedStyleId].photos[0].url.split(':').join('%3A');

  return (
    <div>

      <div> Share this product </div>

      <a target="_blank" href={"https://www.facebook.com/"}>
        <i className="fa-brands fa-square-facebook fa-2xl"></i>
      </a>

      <a href={"https://twitter.com/intent/tweet?text=Check%20out%20" + siteLink}>
        <i className="fa-brands fa-square-twitter fa-2xl"></i>
      </a>

      <a href={"https://pinterest.com/pin/create/button/?url=" + siteLink + "&media=" + stylePhoto + "&description=Come%20visit%20our%20site!"}>
        <i className="fa-brands fa-square-pinterest fa-2xl"></i>
      </a>
    </div>
  );
};
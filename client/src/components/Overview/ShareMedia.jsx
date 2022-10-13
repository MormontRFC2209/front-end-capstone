import react from 'react';

export default function ShareMedia(props) {
  return (
    <div>
      <div> Share this product </div>
      <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//localhost%3A3000/">
        <i className="fa-brands fa-square-facebook fa-2xl"></i>
      </a>
      <a href="https://twitter.com/intent/tweet?text=Check%20out%20http%3A//localhost%3A3000/">
        <i className="fa-brands fa-square-twitter fa-2xl"></i>
      </a>
      <a href="https://pinterest.com/pin/create/button/?url=http%3A//localhost%3A3000/&media=https%3A//images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1%26ixid=eyJhcHBfaWQiOjEyMDd9%26auto=format%26fit=crop%26w=1600%26q=80&description=Come%20visit%20our%20site!">
        <i className="fa-brands fa-square-pinterest fa-2xl"></i>
      </a>
    </div>
  );
};
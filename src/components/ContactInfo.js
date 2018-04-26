import React, { Component } from "react";

class ContactInfo extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="contact-container">
        <div className="card-text-container">
          <div className="contact-container">
            {contactSection(
              titleValueSpan,
              ["name", "email"],
              user,
              "contact-title"
            )}
          </div>
          <div className="social-container">
            {contactSection(
              titleLinkSpan,
              ["website", "facebook", "twitter", "instagram"],
              user,
              "social-info"
            )}
          </div>
        </div>
      </div>
    );
  }
}

const contactMapping = {
  name: "Contact Name",
  email: "Contact Email",
  website: "Website",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter"
};

const contactSection = (
  renderFunc,
  sections,
  contact,
  itemClass = undefined
) => {
  return sections.map((key, i) => {
    if (contact[key] === undefined || contactMapping[key] === undefined)
      return undefined;
    return (
      <div key={i} className={"social-info"}>
        {renderFunc(contactMapping[key], contact[key], itemClass)}
      </div>
    );
  });
};

// Returns a span in the form of this:
// Twitter: www.twitter.com
const titleValueSpan = (title, value, itemClass) => {
  return (
    <div>
      <span className={itemClass}>{title + ": "}</span>
      {value}
    </div>
  );
};

// Returns a span in the form of this:
// Twitter
const titleLinkSpan = (title, link, itemClass) => {
  return (
    <a className={itemClass} href={link}>
      {title}
    </a>
  );
};

export default ContactInfo;

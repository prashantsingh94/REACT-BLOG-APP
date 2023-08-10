export const Footer = () => {
  const date = new Date();
  return (
    <footer className="Footer">
      <p>All Rights Reserved. &copy; {date.getFullYear()}</p>
    </footer>

  )
}

export default Footer;

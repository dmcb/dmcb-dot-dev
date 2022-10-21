const Thing = (props) => {
  const maskImage = {
    WebkitMaskImage: 'url(' + props.imageUrl + ')',
    maskImage: 'url(' + props.imageUrl + ')'
  }

  return (
    <li className="thing">
      <h2>{props.type}</h2>
      <div class="image-border" style={maskImage}>
        <img src={props.imageUrl} alt={props.imageAlt}></img>
      </div>
      <p></p>
    </li>
  )
}

export default Thing;
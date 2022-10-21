const Thing = (props) => {
  return (
    <li className="thing">
      <h2>{props.type}</h2>
      <img src={props.imageUrl + '?w=486'} alt={props.image.alt}></img>
      <p></p>
    </li>
  )
}

export default Thing;
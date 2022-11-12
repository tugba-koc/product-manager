import img from '../../asset/welcome.png'

const Greeting = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column-reverse'}}>
      <img style={{width: 'auto', height: '80vh', objectFit: 'cover'}} src={img} alt="" />
      <p style={{fontWeight: 700, fontSize: '20px'}}>Homepage</p>
    </div>
  )
}

export default Greeting
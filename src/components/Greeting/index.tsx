import img from '../../asset/welcome.png'

type Props = {}

const Greeting = (props: Props) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column-reverse'}}>
      <img style={{width: '60%', height: '80vh', objectFit: 'cover'}} src={img} alt="" />
      <p style={{fontWeight: 700, fontSize: '20px'}}>Homepage</p>
    </div>
  )
}

export default Greeting
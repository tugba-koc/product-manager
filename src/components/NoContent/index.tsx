const NoContent = () => {
  return (
    <div className='' style={{'display':'flex', 'justifyContent': 'center', 'flexDirection': 'column'}}>
      <img style={{width: '260px', margin:'auto'}}
        src='https://easytwou.com/shop/assets/img/norecord.png'
        alt='img'
      />
      <p style={{'textAlign': 'center'}}>There is no content to show.</p>
    </div>
  );
};

export default NoContent;

import nodata from '../../assets/nodata.jpg'
const NoDataFound = ({text}) => {
    return (
      <div className=" relative flex-col flex justify-center items-center  ">
        <img src={nodata} className='w-1/3' />
        <p className="   text-white p-3 rounded-lg bg-primary">{text?text:"No data found."}</p>
      </div>
    );
  };
  
  export default NoDataFound;
import React from "react";
import Header from "../../components/Header/Header.js"
import Footer from "../../components/Footer/Footer.js";
import Banner from "../../components/Banner/Banner"; 
import RowList from "../../components/Rows/RowList/RowList"; 

const Home = ()=>{
    return (
      // <>
      //   <Header />
      //   <Banner />
      //   <RowList />
      //   <Footer />
      // </>

      <>
        <Header />
        <div style={{ paddingTop: "68px" }}>
          <Banner />
          <RowList />
          <Footer />
        </div>
      </>
    );
}
export default Home
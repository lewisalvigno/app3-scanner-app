import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let counter = 0;

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }

    if (results[i].decodedText !== results[i - 1].decodedText) {
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

const Receip = (props) => {



    return (  
        <div className="receip">
        <div>
          <span>RECU PAIEMENT</span>

          <div>
            <div   className="receip_lines  ">
              <span>Parking: &nbsp;</span>
              <span> {props.parking} </span>
            </div>
          </div>

          <div className="receip_lines2">
            <div className="infos clientId_infos">
              <span>ID COMPTE: &nbsp;</span>
              {/* <span> {props.clientId} </span> */}
              <input type="password" value={props.clientId} disabled />
            </div>

            <div className="infos">
              <span>DUREE(H): &nbsp;</span>
              <span> {props.duree} </span> 
            </div>
            

            <div className="infos">
              <span>MONTANT(FCFA): &nbsp;</span>-<span> {props.montant} </span> 
            </div>

            <div className="infos">
              <span>P: &nbsp;</span>
              <span> {props.periode}</span> 
            </div>

            <div className="infos">
              <span>DATE: &nbsp;</span>
              <span> {props.date}</span> 
            </div>

            {/* <div className="infos">
              <span>NB: &nbsp;</span>
              <span >Frais supplementaires en cas de non respect</span> 
            </div> */}

            <br />

          <b>PARK-IT</b>

          <button onClick={props.onClose} className="receip_button" >Imprimer</button>
          </div>
        </div>
      </div>
    )

}


class ResultContainerTable extends React.Component {

   

  render() {
    var results = filterResults(this.props.data);

    console.log(results);

    return (
      <div>
        {/* {
                        results.map((result, i) => {
                            console.log(result);
                            return (<tr key={i}>
                                <i>{i}</i>
                                <i>{result.decodedText}</i>
                                <i>{result.result.format.formatName}</i>
                            </tr>);
                        })
                    } */}
      </div>
    );
  }
}

class ResultContainerPlugin extends React.Component {

    temp = new Date(); 
    HMS = `${this.temp.getHours()}:${this.temp.getMinutes()}:${this.temp.getSeconds()}`

     today = new Date();
     dd = this.today.getDate();
    
     mm = this.today.getMonth()+1; 
     yyyy = this.today.getFullYear();
    // if( dd<10 ) 
    // {
    //     dd='0'+dd;
    // } 
    
    // if(mm<10) 
    // {
    //     mm='0'+mm;
    // } 

    mm0 = this.mm < 10 ? '0'+this.mm : this.mm;
    dd0 = this.dd < 10 ? '0'+this.dd : this.dd;

    today = this.dd0+'/'+this.mm0+'/'+this.yyyy;
   

    state = {
        displayItem: false,
        clientId:"",
        parking:"Parking A",
        duree:"1",
        montant:"300",
        date:this.today,
        periode:this.HMS

      }



    open(){
        this.setState({displayItem: true})
    }

    handleChange (e) {
        this.setState({ clientId: e.target.value });
        console.log(this.state.clientId)
      }

  render() {
       
    let results = filterResults(this.props.results);
    let parking = this.state.parking;
    let duree = this.state.duree;
    let montant = this.state.montant;
    let date = this.state.date;
    let periode = this.state.periode;
    let disp = this.state.displayItem;

    //  clientId = this.state.clientId;


    const closeChild = ()=> {

       this.setState({displayItem: false})

       console.log(this.state.displayItem)
       window.location.reload();

        
      }


      const openChild = ()=> {

        this.setState({displayItem: true})
         console.log(this.state.displayItem)
       }

     
      let temp = new Date(); 
      let hhh0 = temp.getHours() < 10 ? '0'+temp.getHours() : temp.getHours();
      let mmm0 = temp.getMinutes() < 10 ? '0'+temp.getMinutes() : temp.getMinutes();
      let sss0 = temp.getSeconds() < 10 ? '0'+temp.getSeconds() : temp.getSeconds();
    //   for period_to
    // let temp2 = temp.setHours(temp.getHours()  + parseInt(duree));
    let temp2 = new Date(new Date().setHours(new Date().getHours() + parseInt(duree)));
    // let hh = temp.getHours()  + parseInt(duree);
      let hhh1 = temp2.getHours() < 10 ? '0'+temp2.getHours() : temp2.getHours();
    //   let hhh1 = hh < 10 ? '0'+hh : hh;


      let HMS = `${hhh0}:${mmm0}:${sss0}`
      let period_from = HMS;
      let period_to = `${hhh1}:${mmm0}:${sss0}`;
        let today = new Date();
        let dd = today.getDate();
       
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
       // if( dd<10 ) 
       // {
       //     dd='0'+dd;
       // } 
       
       // if(mm<10) 
       // {
       //     mm='0'+mm;
       // } 
   
       let mm0 = mm < 10 ? '0'+mm : mm;
       let dd0 = dd < 10 ? '0'+dd : dd;
   
       today = dd0+'/'+mm0+'/'+yyyy;

       
        periode = `De ${period_from} à ${period_to}`;
        date = today;
       let clientId = "";

       const notify = () => {
        toast.success(`Paiement reussi!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }

      
  

        const checkClientId = (e) => {

            if(results.length > 0){
                clientId = results[0].decodedText;
                // console.log(clientId)
                // dispData();
                // openChild();
            }else {
                clientId = "";
            }

            return clientId;

        }

        checkClientId();
        
    

        montant = parseInt(duree) * montant;

        const  dispData = ()=> {
            // this.setState({date:today})
            console.log( clientId +" "+ parking+" "+duree+" "+montant+" "+periode+" "+date)
            this.setState({clientId:clientId})
            this.setState({displayItem: true})

            // console.log(this.state.duree)
        }
        
        // console.log(results[0])

        async function login() {
            // const history = this.state.history;
            // console.log(username, password);
        
            let item = { clientId, parking, duree, montant, date, periode };
            let response = await fetch("http://192.168.1.80:8000/pay/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Access-Control-Allow-Origin":"*",
              },
              body: JSON.stringify(item),
            });
            let result = await response.json();
            console.log(result);
            localStorage.setItem("user-info", JSON.stringify(result));
            // navigate("/")
            if(response.status == "201"){
                notify();
            }
            console.log("result", response.status)
        
          }


    return (
      <>
        <div className="Result-container">
          {/* <div className='Result-header'>Resultas ({results.length})</div> */}
          <div className="Result-header">ID COMPTE CLIENT:</div>
          {/* <div className='Result-section'>
                    <ResultContainerTable data={this.props.results} />
                </div> */}
          {results.map((result, i) => {
            // console.log(result);
            // this.setState({clientId:result.decodedText})
            const updateClientId = (e)=> {
                this.setState({clientId:result.decodedText})
                console.log(this.state.clientId)
            }
            return <input onChange={this.handleChange} key={i} type="password" value={result.decodedText} />;
          })}
          {/* <input type="text"   /> */}
        </div>

        <div className="qr_select_div">
          <span>Choisir parking</span>
          <select value={this.state.parking} onChange={(e)=>this.setState({ parking:e.target.value })} className="qr_select" name="duree" id="cars">
            <option value="Parking A">Parking A</option>
            <option value="Parking B">Parking B</option>
            <option value="Parking C">Parking C</option>
            <option value="Parking D">Parking D</option>
          </select>
        </div>
        <br />
        <div className="qr_select_div">
          <span>Durée parking</span>
          <br />
          <select value={this.state.duree} onChange={(e)=>this.setState({ duree:e.target.value })}  className="qr_select" name="duree" id="cars">
            <option value="1H">1H</option>
            <option value="2H">2H</option>
            <option value="3H">3H</option>
            <option value="4H">4H</option>
            <option value="5H">5H</option>
          </select>
        </div>
        <br />
        <button  onClick={e=>{dispData(); login();}} className="qr_scanner_button" type="button">
          Payer
        </button>
        <br />
        <br />
        <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

       {/* <Receip/> */}
       {disp && <Receip clientId={clientId} parking={parking} duree={duree} montant={montant} periode={periode} date={date} onClose={closeChild} /> }
      </>
    );
  }
}

export default ResultContainerPlugin;

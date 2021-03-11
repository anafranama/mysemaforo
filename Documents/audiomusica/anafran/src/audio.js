import React from "react";

import reactDom from "react-dom";

export class FetchingEjemplo extends React.Component {
    constructor() {
        super();
        this.state = {
            fetchData: [],
            clasesbotones: [{
                play: "fas fa-play simbolo1",
                stop: "fas fa-pause-circle simbolo1 pausa"
            }],
            memoria:0
        };
       
        this.primera = true;

    }
    componentDidMount() {
        fetch("https://assets.breatheco.de/apis/sound/songs")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ fetchData: data });
                console.log(this.state.fetchData,"dimount");
            });
    }

    adelante(id) {
    
        var copy = [...this.state.fetchData];

        copy[this.state.memoria]["claseid"] = "indi";
        copy[this.state.memoria].clasecancion = "cancion";
        this.state.memoria++;
        if (this.state.memoria == copy.length) {
            this.state.memoria = 0;
        }

        copy[this.state.memoria]["claseid"] = "cancionactual";

        copy[this.state.memoria].clasecancion = "cancionactual";

        
        this.setState({ fetchData: copy });

        var copy2 = [...this.state.clasesbotones]
        copy2[0].play = "fas fa-play simbolo1 "
        copy2[0].stop = "fas fa-pause-circle simbolo1 pausa"
        this.setState({ clasesbotones: copy2 })





    }

    atras(id) {
        var copy = [...this.state.fetchData];

        copy[this.state.memoria]["claseid"] = "indi";
        copy[this.state.memoria].clasecancion = "cancion";
        this.state.memoria--;
        if (this.state.memoria == -1) {
            this.state.memoria = copy.length - 1;
        }

        copy[this.state.memoria]["claseid"] = "cancionactual";

        copy[this.state.memoria].clasecancion = "cancionactual";

        this.setState({ fetchData: copy });

        var copy2 = [...this.state.clasesbotones]
        copy2[0].play = "fas fa-play simbolo1 "
        copy2[0].stop = "fas fa-pause-circle simbolo1 pausa"
        this.setState({ clasesbotones: copy2 })

        
    }

    reproducir() {
        document.getElementById("reproductor").play()
        var copy = [...this.state.clasesbotones]
        copy[0].play = "fas fa-play simbolo1 pausa"
        copy[0].stop = "fas fa-pause-circle simbolo1 "
        this.setState({clasesbotones:copy})
        console.log("reproducir",this.state.memoria)
    }
    pausar() {
        document.getElementById("reproductor").pause()
        var copy = [...this.state.clasesbotones]
        copy[0].play = "fas fa-play simbolo1"
        copy[0].stop = "fas fa-pause-circle simbolo1 pausa"
        this.setState({ clasesbotones: copy })
    }


    insertaretiquetasonido(){
        if (this.state.fetchData[0] !== undefined) {
            return (<audio id="reproductor" controls source src={"https://assets.breatheco.de/apis/sound/" + this.state.fetchData[this.state.memoria].url} type="audio/mp3" style={{ display: "none" }} >


            </audio>)
    
        }
    }
    seleccionarcancion(id){
        
        this.pausar()
        console.log(id)
       
        this.setState({ memoria:id }, () => {               
            
            console.log(this.state.memoria) 
            this.reproducir()
        });
     

       console.log(this.state.memoria,"114")



        var copy = [...this.state.fetchData];

        copy[this.state.memoria]["claseid"] = "indi";
        copy[this.state.memoria].clasecancion = "cancion";
        

        this.setState({ fetchData: copy });
        

        copy[id]["claseid"] = "cancionactual";

        copy[id].clasecancion = "cancionactual";

        this.setState({ fetchData: copy });

       
    
       
    }


    render() {

       



        return (
            <div>

                {this.state.fetchData.map((song, i) => {           
                    if (this.primera == true) {                    
                        if (i == 0) {
                            var valor = "cancionactual";

                            var valor2 = "cancionactual";
                            song.claseid = valor;

                            song.clasecancion = valor2;
                        } else {
                            var valor = "indi";
                            var valor2 = "cancion";
                            song.claseid = valor;

                            song.clasecancion = valor2;
                            if (i == this.state.fetchData.length - 1) {
                                this.primera = false;
                            }
                        }
                    }

                    return (
                        <div className="filaclase text-light " key={i}>
                            <div className={this.state.fetchData[i].claseid}>{i + 1}</div>
                            <div className={this.state.fetchData[i].clasecancion} onClick={() => this.seleccionarcancion(i)}>
                                <div key={i}> {song.name} </div>
                            </div>
                        </div>
                    );
                })}

                <div className="buttonbar">
                    <div className="containersimbolos">
                        <i
                            className="fas fa-caret-square-left simbolosdelado"
                            onClick={() => this.atras(this.state.memoria)}
                        ></i>

                        {<i className={this.state.clasesbotones[0].play} onClick={() => this.reproducir()}></i>}
                        <i className={this.state.clasesbotones[0].stop} onClick={()=> this.pausar()} ></i>
                        <i
                            className="fas fa-caret-square-right simbolosdelado"
                            onClick={() => this.adelante(this.state.memoria)}
                        ></i>
                    </div>
                </div>
               
                {this.insertaretiquetasonido()}

            </div>
        );
    }
}


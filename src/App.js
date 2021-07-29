import React, {Component} from "react";
import './App.css';
import Display from './components/Display';
import Button from './components/Button';

class App extends Component {
  state = {
    display: "0",
    equation: ""
  }
  
  numInput = e => {
    const { display, equation } = this.state;
    
    if (equation.match(/[0-9\.]$/) && 
       equation.includes("=")) {
      if (equation.match(/[+\-*\/]/]) == null) {
        let val = equation + e.currentTarget.value;
        this.setState({
          display: val,
          equation: val
        });
      } else {
        this.setState({
          display: display + e.currentTarget.value,
          equation: equation + e.currentTarget.value
        });
      } else if (equation.match(/[+\-*\/$)) {
        let val = equation + e.currentTarget.value;
        this.setState({
          display: e.currentTarget.value;
          eqaution: val
        });
      }
    } else if (display === "0" && e.currentTarget.value 
       !== "0" || equation.includes("=")) {
      this.setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value
      });
    } 
  }

  operInput = (e) => {
    const { eqaution, display } = this.state;

    if (equation.includes("=")) {
       let val = display;
       val += e.currentTarget.value;
       this.setState({
         equation: val
       });
    } else {
      if (equation != "" && 
         equation.match(/[*\-\/+]$/) == null) {
        let val = equation;
        val += e.currentTarget.value;
        this.setState({ equation: val });
      } else if (equation.match(/[*\-\/+]$/) != null) {
        let val = equation;
        val = val.substring(0, (val.length - 1));
        val += e.currentTarget.value;
        this.setState({ equation: val });
      } 
    }
  }
  
  decInput = (e) => {
    const { equation, display } = this.state;

    if (equation == "" || equation .includes("=")) {
      let val = '0.';
      this.setState({ 
        display: val, 
        equation: val
      });
    } else if (equation.match(/[+\-*\/]$/)) {
      let val = '0.';
      this.setState({
       display: val,
       equation: eqaution + val
      });
    } else if (!display.includes(".")) {
      this.setState({
        display: display + e.currentTarget.value,
        equation: equation+ e.currentTarget.value
      });
    }
  }

  clearInput = (e) => {
    this.setState({
      display: "0",
      equation: ""
    });
  }

  calculate = () => {
    const { eqaution, display } = this.state;

    if (equation.includes("=")) {
      let val ='${display} = ${display}';
      this.setState({
        equation: val
      });
    } else if (equation != "" && eqaution.match(/[+\-*\/]/) != null && equation.match(/[+\-*\/]$/) == null) {
      let result = Number.isInteger(eval(eqaution)) 
        ? eval(equation) 
        : parseFloat(eval(eqaution).toFixed(5));
      let val = eqaution;
      val += ${result};
      this.setState({
        display: result,
        eqaution: val
      });
    }
  }
  
  render {
    const {equation. display} = this.state;
    const {
      calculate, 
      clearInput, 
      decInput, 
      operInput, 
      numInput
    } = this;
    return <div className="container">
      <Display equation={equation} display={display} />
      <Button
        id="clear"
        value="clear"
        display="AC"
        class="row-3 col-1"
        click={clearInput}
      />
      <Button
        id="sign"
        value"+/-"
        display="±"
        class="row-3 col-2"
      />
      <Button
        id="percent"
        value="%"
        display="%"
        class="row-3 col-3"
      />
      <Button
        id="divide"
        value="/"
        display="/"
        class="oper row-3 col-4"
        click={operInput}
      />
      <Button
        id="seven"
        value="7"
        display="7"
        class="num row-4 col-1"
        click={numInput}
       />
       <Button
         id="eight"
         value="8"
         display="8"
         class="num row-4 col-2"
         click={numInput}
       />
       <Button
         id="nine"
         value="9"
         display="9"
         class="num row-4 col-3"
         click={numInput}
       />
       <Button
         id="multiply"
         value="*"
         display="x"
         class="oper row-4 col-4"
         click={operInput}
       />
       <Button
         id="four"
         value="4"
         display="4"
         class="num row-5 col-1"
         click={numInput}
       />
       <Button
         id="five"
         value="5"
         display="5"
         class="num row-5 col-2"
         click={numInput}
       />
       <Button
         id="six"
         value="6"
         display="6"
         class="num row-5 col-3"
         click={numInput}
       />
       <Button
         id="subtract"
         value="-"
         display="-"
         class="oper row-5 col-4"
         click={operInput}
       />
       <Button
         id="one"
         value="1"
         display="1"
         class="num row-6 col-1"
         click={numInput}
       />
       <Button
         id="two"
         value="2"
         display="2"
         class="num
         row-6 col-2"
         click={numInput}
       />
       <Button
         id="three"
         value="3"
         display="3"
         class="num row-6 col-3"
         click={numInput}
       />
       <Button
         id="add"
         value="+"
         display="+"
         class="oper row-6 col-4"
         click={operInput}
       />
       <Button
         id="zero"
         value="0"
         display="0"
         class="num row-7 col-1"
         click={numInput}
       />
       <Button
         id="decimal"
         value="."
         display="."
         class="dec row-7 col-2"
         click={decInput}
       />
       <Button
         id="equals"
         value="="
         display="="
         class="oper row-7 col-3"
         click={calculate}
       />
    </div>
  }
}

export default App
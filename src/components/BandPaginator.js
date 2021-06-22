import React, {Component} from 'react';
import { Card, Button, Row} from 'react-bootstrap'

class BandPaginator extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 0};
        this.pageCount = Math.ceil(this.props.bands.length / this.props.perPage);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }

    handleIncrement() {
        this.setState({page: (this.state.page + 1) % this.pageCount});
    }

    handleDecrement() {
        this.setState({page: Math.abs(this.state.page - 1) % this.pageCount});
    }

    render() {
        return ( 
            <React.Fragment>
                <Row className="d-flex justify-content-center">
                    <div className="col-8">
                        { this.props.bands.slice(this.state.page*this.props.perPage, 
                        Math.min(this.props.bands.length, ((this.state.page+1)*this.props.perPage))).map((band) =>
                                <Card key={band} className="text-center p-2 mb-2"><h4>{band}</h4></Card> ) }
                    </div> 
                </Row>    
                {this.pageCount > 1 ? 
                    <Row className="d-flex justify-content-center">
                            <Button className="col-4" onClick={this.handleIncrement}>{this.state.page === this.pageCount-1 ?  "Beginning" : "Next"} </Button>
                    </Row> :
                    null
                } 
            </React.Fragment>
                );
                
    }

}

export default BandPaginator; 
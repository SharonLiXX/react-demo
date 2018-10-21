import * as React from "react";
import "./FlickrComponent.css";
import { config } from "../config";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme: any) => ({
  textField: {
    width: 420,
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontsize: "300px",
  },
});

class FlickrComponent extends React.Component<{}> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: "Auckland",
      images: [],
      classes:[],
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  public handleChange(event: any) {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  }

  public keyPress(event: any) {
    const {
      searchTerm,
    } = this.state as any;

    if (event.key === 'Enter') {
      this.searchImages(searchTerm);
    }
  }

  public componentDidMount() {
    const {
      searchTerm,
    } = this.state as any;
    this.searchImages(searchTerm);
    this.setState({
      searchTerm,
    });
  }

  public render() {
    const {
      images
    } = this.state as any;
    
    const {
      classes
    } = this.props as any;

    return (
      <div>
        <div className="title">
          Flickr Images Search
        </div>
        <div className="searchInput">
        <TextField
          id="outlined-search"
          label="search..."
          variant="outlined"
          className={classes.textField}
          onChange={this.handleChange}
          onKeyPress={this.keyPress}
        />
        </div>
        <div className="images">
          {
            images.map((image: any) => {
              return <img src={image} key={image}/>;
            })
          }
        </div>
      </div>
    );
  }

  private searchImages(term: string) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
      config.flickrAPIKey
      }&text=${term}&format=json&nojsoncallback=1`;

    fetch(url)
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res.photos.photo;
    })
    .then((list: any[]) => {
      const urls = list.map((item) => {
        return this.getImageURL(item);
      });
      return urls;
    })
    .then((urls) => {
      return urls.slice(0, 9);
    })
    .then((urls) => {
      this.setState({
        images: urls,
      });
    })
  }

  private getImageURL(obj: any) {
    return `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_n.jpg`;
  }
}
export default withStyles(styles as any)(FlickrComponent);
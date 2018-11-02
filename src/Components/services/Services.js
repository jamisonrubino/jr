import React, { Component } from "react";
import servicesData from "./servicesData.js";

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      items: [],
      selectedItems: [],
      services: null,
      submitted: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.setItems();
  }

  setItems = () => {
    let items = [],
      selectedItems = [],
      sections = [],
      services = JSON.parse(JSON.stringify(servicesData.servicesSections));
    services.map((s, i) => {
      sections[i] = false;
      selectedItems[i] = [];
      items[i] = s.items.slice(0).sort();
    });
    this.setState({ items, selectedItems, sections, services });
  };

  clickHandler = (e, i, j = false, item = false) => {
    e.stopPropagation();
    let s = document.getElementsByClassName("services__items__wrap")[i],
      c = s.classList;
    if (item && c.contains("live")) {
      this.selectItem(e, i, j, item);
    } else if (!c.contains("live")) {
      c.add("live");
      window.addEventListener("click", this.resetSections, false);
    }
  };

  serviceSearch = (s, item) => {
    let index = 0;
    for (let i = 0; i < s.length; i++) {
      let c = s[i].localeCompare(item);
      if (c > -1) {
        // item is smaller than w
        index = i; // insert item before w
        break;
      } else if (c < 0 && i === s.length - 1) {
        // item is bigger than w but has nowhere to go
        index = i + 1;
        break;
      }
    }
    return index;
  };

  resetSections = e => {
    e.stopPropagation();
    document.querySelectorAll(".live").forEach(x => x.classList.remove("live"));
    window.removeEventListener("click", this.resetSections, false);
    let newS = this.state.sections.map(x => false);
    this.setState({ sections: newS });
  };

  selectItem = (
    e,
    sectionIndex,
    itemIndex,
    item,
    items = [...this.state.items],
    selectedItems = [...this.state.selectedItems],
    sections = [...this.state.sections]
  ) => {
    let selectedItemsIndex = this.serviceSearch(
      this.state.selectedItems[sectionIndex],
      item
    );
    sections[sectionIndex] = true;
    selectedItems[sectionIndex].splice(
      selectedItemsIndex,
      0,
      items[sectionIndex].splice(itemIndex, 1)[0]
    );
    this.setState({ items, selectedItems, sections }, () => {
      let s = document.getElementsByClassName("services__items__wrap");
      this.state.sections.forEach(
        (x, i) => (x ? s[i].classList.add("live") : null)
      );
    });
  };

  removeItem = (
    e,
    sectionIndex,
    itemIndex,
    item,
    items = [...this.state.items],
    selectedItems = [...this.state.selectedItems]
  ) => {
    let itemsIndex = this.serviceSearch(this.state.items[sectionIndex], item);
    items[sectionIndex].splice(
      itemsIndex,
      0,
      selectedItems[sectionIndex].splice(itemIndex, 1)[0]
    );
    this.setState(
      { items, selectedItems, sections: this.state.sections.slice() },
      () => {
        let s = document.getElementsByClassName("services__items__wrap");
        this.state.sections.forEach(
          (x, i) => (x ? s[i].classList.add("live") : null)
        );
      }
    );
  };

  removeAll = (
    items = [...this.state.items],
    selectedItems = [...this.state.selectedItems],
    servicesSelection = [...this.state.selectedItems]
  ) => {
    if (selectedItems.findIndex(x => x.length > 0) > -1) {
      let itemsIndex;
      for (let i = 0; i < selectedItems.length; i++) {
        while (selectedItems[i].length > 0) {
          itemsIndex = this.serviceSearch(
            this.state.items[i],
            selectedItems[i][0]
          );
          items[i].splice(itemsIndex, 0, selectedItems[i].splice(0, 1)[0]);
        }
      }
    }
  };

  submitHandler = async e => {
    e.preventDefault();
    var l = this.state.selectedItems.length,
      selectedItems = [];
    for (let i = 0; i < l; i++)
      selectedItems[i] = [...this.state.selectedItems[i]];
    await this.removeAll();
    if (selectedItems.findIndex(x => x.length > 0) > -1)
      this.props.history.push({
        pathname: "/contact",
        state: { services: selectedItems }
      });
  };

  render() {
    const ServiceItems = props => {
        let s = props.section,
          i = props.index,
          iS = this.state.services[i],
          allSectionItems = s.map((item, j, arr) => (
            <span
              className={"services__item--" + iS.slug}
              key={j}
              data-key={j}
              onClick={e => this.clickHandler(e, i, j, item)}
            >
              {item}
            </span>
          ));

        return (
          <div
            className={"skills--" + iS.slug + " services__items__wrap"}
            key={i}
            onClick={e => this.clickHandler(e, i)}
          >
            <h3 className={iS.color}>{iS.name}</h3>
            <div className={"div__services__items " + iS.color}>
              {allSectionItems}
            </div>
          </div>
        );
      },
      SelectedServiceItems = props => {
        let s = props.section,
          i = props.index,
          sS = this.state.services[i],
          allSelectedServiceItems = s.map((item, j) => (
            <span
              className={"services__item--" + sS.slug}
              key={j}
              onClick={e => this.removeItem(e, i, j, item)}
            >
              {item}
            </span>
          ));

        return (
          <div className={"services__selected--" + sS.slug + " " + sS.color}>
            <h4 style={{ display: "none" }}>{sS.name}</h4>
            {allSelectedServiceItems}
          </div>
        );
      },
      services = this.state.items.map((s, i) => (
        <ServiceItems section={s} index={i} key={i} />
      )),
      selectedServices = this.state.selectedItems.map((s, i, arr) => (
        <SelectedServiceItems
          section={s}
          index={i}
          selectedItems={arr}
          key={i}
        />
      )),
      selectedServicesPlaceholder =
        this.state.selectedItems.findIndex(x => x.length > 0) < 0 ? (
          <span className="services__selected__placeholder">
            Click on services to include in contact form.
          </span>
        ) : null;

    return (
      <div className="services__wrap">
        {services}
        <div
          className="services__selected__wrap"
          onClick={e => e.stopPropagation()}
        >
          <div className="services__selections__wrap">
            {selectedServicesPlaceholder}
            {selectedServices}
          </div>
          <div
            className="services__selected__submit"
            onClick={e => this.submitHandler(e, this.state.selectedItems)}
          >
            <span>›</span>
          </div>
        </div>
      </div>
    );
  }
}

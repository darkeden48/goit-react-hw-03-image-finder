import { Component } from "react";
import I from "./ImageGallery.module.css";

export default function ImageGalleryItem({ image }) {
  //  function choco (e) {
  //     this.props.onClickElem(e);
  // // console.log(e.target)
  // }
  if (image.total === 0) {
    return <h1>Картинок по такому запросу не найдено</h1>;
  }

  return (
    <ul className={I.list}>
      {image.hits.map((el) => (
        <li id={el.id}>
          <img src={el.webformatURL} alt={el.tags} width="250" height="250" />
        </li>
      ))}
    </ul>
  );
}

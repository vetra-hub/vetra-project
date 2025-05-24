import { createRoot } from "react-dom/client";
import Artikel from "./Artikel";
import QnA from "./QnA";
import ProductItem from "./ProductItem";
import Container from "./Container";
import './custom.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>
            <Artikel/>            
            <QnA/>
            <ProductItem/>
            </Container>
        </div>
    )
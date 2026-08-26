import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";

import DeletarCategoria from "./components/categorias/deletarcategorias/DeletarCategoria";
import FormCategoria from "./components/categorias/formcategoria/FormCategoria";
import ListarCategorias from "./components/categorias/listarcategorias/ListarCategorias";

import ListaProdutos from "./components/produtos/listaprodutos/ListaProdutos";
import FormProduto from "./components/produtos/formproduto/FormProduto";
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto";
import Cart from "./components/carrinho/cart/Cart";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                    <div className="flex flex-col min-h-[70vh] bg-slate-200">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="/home" element={<Home />} />

                            {/* Categorias */}
                            <Route path="/categorias" element={<ListarCategorias />} />
                            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
                            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
                            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />

                            {/* Produtos */}
                            <Route path="/produtos" element={<ListaProdutos />} />
                            <Route path="/cadastrarproduto" element={<FormProduto />} />
                            <Route path="/editarproduto/:id" element={<FormProduto />} />
                            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />

                            {/* Perfil e Carrinho */}
                            <Route path="/perfil" element={<Perfil />} />
                            <Route path="/carrinho" element={<Cart />} />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
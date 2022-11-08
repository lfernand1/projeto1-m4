import "./Home.css";
import PaletaLista from "components/PaletaLista/PaletaLista";
import AdicionaEditaPaletaModal from "components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import Navbar from "components/Navbar/Navbar";
import { useState } from "react";
import { ActionMode } from "constants/index";

function Home() {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);
  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [paletaParaEditar, setPaletaParaEditar] = useState();
  const [paletaParaDeletar, setPaletaParaDeletar] = useState();

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  }
  
  
  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionaPaletaModal(true);
  } 

  
const handleCloseModal = () => {
  setCanShowAdicionaPaletaModal(false);
  setPaletaParaAdicionar();
  setPaletaParaDeletar();
  setPaletaParaEditar();
}


  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
      />
      <div className="Home__container">
        <PaletaLista
          mode={modoAtual}
          paletaCriada={paletaParaAdicionar}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta} />
        
        {canShowAdicionaPaletaModal && (
         <AdicionaEditaPaletaModal
         mode={modoAtual}
         paletaToUpdate={paletaParaEditar}
         closeModal={handleCloseModal}
         onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
         />
        )}
      </div>
    </div>
  );
}

export default Home;

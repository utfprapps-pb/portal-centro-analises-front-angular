export interface ElementoQuimico {
    name: string;              // Nome do elemento
    atomic_mass: number;       // Massa atômica
    category: string;          // Categoria em inglês (mantida para referência)
    categoria: string;         // Categoria traduzida para português
    number: number;            // Número atômico
    phase: string;             // Fase do elemento (sólido, líquido, gasoso)
    source: string;            // Fonte (link para mais informações)
    spectral_img?: string;     // URL da imagem espectral (pode ser nula)
    symbol: string;            // Símbolo químico
    xpos: number;              // Posição X na tabela periódica
    ypos: number;              // Posição Y na tabela periódica
    shells: number[];          // Camadas eletrônicas
    color?: string | null;     // Cor do elemento (pode ser nula)
    boil?: number | null;      // Ponto de ebulição (pode ser nulo)
    melt?: number | null;      // Ponto de fusão (pode ser nulo)
    density?: number | null;   // Densidade (pode ser nula)
    discovered_by?: string;    // Descobridor do elemento (pode ser nulo)
    molar_heat?: number | null;// Calor molar (pode ser nulo)
    period?: number;           // Período na tabela periódica (opcional)
    named_by?: string | null;  // Nomeado por (pode ser nulo)
    selected: boolean;
}

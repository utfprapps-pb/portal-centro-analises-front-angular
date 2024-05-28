import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PrimeNGConfig } from 'primeng/api';
import pageSettings from '../app/core/constants/page-settings';
import { AuthService } from './core/services/auth.service';
import { ResizeService } from './utils/resize.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    public pageSettings = pageSettings;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly resizeService: ResizeService,
        private config: PrimeNGConfig,
    ) {
        this.config.setTranslation({
            startsWith: "Começa com",
            contains: "Contém",
            notContains: "Não contém",
            endsWith: "Termina com",
            equals: "Igual a",
            notEquals: "Diferente de",
            noFilter: "Sem filtro",
            lt: "Menor que",
            lte: "Menor ou igual a",
            gt: "Maior que",
            gte: "Maior ou igual a",
            is: "É",
            isNot: "Não é",
            before: "Antes",
            after: "Depois",
            dateIs: "Data é",
            dateIsNot: "Data não é",
            dateBefore: "Data é antes de",
            dateAfter: "Data é depois de",
            clear: "Limpar",
            apply: "Aplicar",
            matchAll: "Corresponder a todos",
            matchAny: "Corresponder a qualquer",
            addRule: "Adicionar regra",
            removeRule: "Remover regra",
            accept: "Sim",
            reject: "Não",
            choose: "Escolher",
            upload: "Enviar",
            cancel: "Cancelar",
            pending: "Pendente",
            fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            dayNamesMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sá"],
            monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            chooseYear: "Escolher Ano",
            chooseMonth: "Escolher Mês",
            chooseDate: "Escolher Data",
            prevDecade: "Década Anterior",
            nextDecade: "Próxima Década",
            prevYear: "Ano Anterior",
            nextYear: "Próximo Ano",
            prevMonth: "Mês Anterior",
            nextMonth: "Próximo Mês",
            prevHour: "Hora Anterior",
            nextHour: "Próxima Hora",
            prevMinute: "Minuto Anterior",
            nextMinute: "Próximo Minuto",
            prevSecond: "Segundo Anterior",
            nextSecond: "Próximo Segundo",
            am: "AM",
            pm: "PM",
            today: "Hoje",
            weekHeader: "Sem",
            firstDayOfWeek: 0,
            dateFormat: "dd/mm/yy",
            weak: "Fraco",
            medium: "Médio",
            strong: "Forte",
            passwordPrompt: "Digite uma senha",
            emptyFilterMessage: "Nenhum resultado encontrado",
            searchMessage: "{0} resultados estão disponíveis",
            selectionMessage: "{0} itens selecionados",
            emptySelectionMessage: "Nenhum item selecionado",
            emptySearchMessage: "Nenhum resultado encontrado",
            emptyMessage: "Nenhuma opção disponível",
            aria: {
                trueLabel: "Verdadeiro",
                falseLabel: "Falso",
                nullLabel: "Não Selecionado",
                star: "1 estrela",
                stars: "{0} estrelas",
                selectAll: "Todos os itens selecionados",
                unselectAll: "Todos os itens desmarcados",
                close: "Fechar",
                previous: "Anterior",
                next: "Próximo",
                navigation: "Navegação",
                scrollTop: "Rolar para o Topo",
                moveTop: "Mover para o Topo",
                moveUp: "Mover para Cima",
                moveDown: "Mover para Baixo",
                moveBottom: "Mover para o Fim",
                moveToTarget: "Mover para o Alvo",
                moveToSource: "Mover para a Fonte",
                moveAllToTarget: "Mover Tudo para o Alvo",
                moveAllToSource: "Mover Tudo para a Fonte",
                pageLabel: "Página {0}",
                firstPageLabel: "Primeira Página",
                lastPageLabel: "Última Página",
                nextPageLabel: "Próxima Página",
                prevPageLabel: "Página Anterior",
                rowsPerPageLabel: "Linhas por página",
                jumpToPageDropdownLabel: "Ir para Página (Dropdown)",
                jumpToPageInputLabel: "Ir para Página (Input)",
                selectRow: "Linha Selecionada",
                unselectRow: "Linha Desmarcada",
                expandRow: "Linha Expandida",
                collapseRow: "Linha Recolhida",
                showFilterMenu: "Mostrar Menu de Filtro",
                hideFilterMenu: "Esconder Menu de Filtro",
                filterOperator: "Operador de Filtro",
                filterConstraint: "Restrição de Filtro",
                editRow: "Editar Linha",
                saveEdit: "Salvar Edição",
                cancelEdit: "Cancelar Edição",
                listView: "Visualização em Lista",
                gridView: "Visualização em Grade",
                slide: "Slide",
                slideNumber: "Slide {0}",
                zoomImage: "Ampliar Imagem",
                zoomIn: "Ampliar",
                zoomOut: "Reduzir",
                rotateRight: "Girar para a Direita",
                rotateLeft: "Girar para a Esquerda"
            }
        }
        )
    }

    public ngOnInit(): void {
        this.resizeService.screenWidth$.subscribe(width => {
            pageSettings.isMobile = (width < 720);
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                let url: string = event.url;
                const usuarioAutenticado = this.authService.isUserAuthenticated();
                pageSettings.showHeader = usuarioAutenticado;
                if (usuarioAutenticado) {
                    if (url == '/' || url == '/entrar') {
                        this.router.navigate(['/inicio'], { replaceUrl: true });
                    }
                }
            }
            if (event instanceof NavigationEnd) {
                let url: string = event.url;
                if (url.includes('?')) {
                    url = url.substring(0, url.indexOf('?'));
                }
                if (!this.authService.isUserAuthenticated()) {
                    this.router.navigate(['/entrar'], { replaceUrl: true });
                }
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(it => it.unsubscribe());
    }

}

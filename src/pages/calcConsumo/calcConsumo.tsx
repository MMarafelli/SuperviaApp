import { useState, useEffect, useCallback } from 'react';
import { ICampos } from '../../types/calcConsumo.types';
import { useCalculos } from '../../hooks/useCalculos';
import { StorageService } from '../../services/StorageService';
import { isDevelopment } from '../../utils/devUtils';

// Novos componentes do design system
import {
    SVButton,
    SVInputField
} from '../../components/ui';
import { PageTitle } from '../../design-system';
import { 
    CalculationSection,
    FieldGroup,
    ResultDisplay,
    ActionButtons,
    ResponsiveCalculationLayout,
    CalculationTable
} from '../../components/calculation/CalculationComponents';

// Styles
// Removido import duplicado do design-system

const TabelaConsumo = () => {
    // Estados
    const [editarEsferas, setEditarEsferas] = useState(false);
    const [editarTinta, setEditarTinta] = useState(false);
    
    const isDev = isDevelopment();
    const [campos, setCampos] = useState<ICampos>(StorageService.getInitialState(isDev));

    // Atualizador de cache
    useEffect(() => {
        Object.keys(campos).forEach((campo) => {
            StorageService.setItem(campo, campos[campo as keyof ICampos]);
        });
    }, [campos]);

    // Handler de valor geral - memoizado
    const handleChange = useCallback((campo: keyof ICampos, valor: string) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [campo]: valor,
        }));
    }, []);

    // Handlers de edição - memoizados
    const handleEditEsfera = useCallback(() => setEditarEsferas(!editarEsferas), [editarEsferas]);
    const handleEditTinta = useCallback(() => setEditarTinta(!editarTinta), [editarTinta]);

    // Função para limpar todos os campos
    const limparTudo = useCallback(() => {
        setCampos(StorageService.getInitialState(isDev));
        setEditarEsferas(false);
        setEditarTinta(false);
    }, [isDev]);

    // Função para compartilhar dados
    const compartilharDados = useCallback(() => {
        const dadosParaCompartilhar = `📊 CÁLCULO DE CONSUMO SuperVia\n\n` +
            `📐 Total m²: ${campos.totalMetrosPista || '0'}\n` +
            `⚪ Esfera: ${campos.esfera || '0'} kg\n` +
            `📊 Resultado Esfera: ${campos.resultadoEsferas || '0'} kg/m²\n` +
            `🎨 Tinta: ${campos.tinta || '0'} baldes\n` +
            `📊 Resultado Tinta: ${campos.resultadoTinta || '0'} m²/balde`;

        if (navigator.share) {
            navigator.share({
                title: 'Cálculo de Consumo - SuperVia',
                text: dadosParaCompartilhar,
            }).catch(console.error);
        } else {
            navigator.clipboard?.writeText(dadosParaCompartilhar)
                .then(() => alert('📋 Dados copiados para a área de transferência!'))
                .catch(() => alert('❌ Erro ao copiar dados'));
        }
    }, [campos]);

    // Cálculos
    const { resultadoEsferas, resultadoTinta } = useCalculos(campos);

    useEffect(() => {
        handleChange('resultadoEsferas', resultadoEsferas);
        handleChange('resultadoTinta', resultadoTinta);
    }, [resultadoEsferas, resultadoTinta]);

    // Layout Mobile - memoizado para evitar re-renders
    const MobileLayout = useCallback(() => (
        <div className="sv-space-y-4">
            {/* Seção 1: Total m² */}
            <CalculationSection 
                title="Total da Pista"
            >
                <SVInputField
                    label="📐 Total m²"
                    value={campos.totalMetrosPista}
                    onChange={(e) => handleChange('totalMetrosPista', e.target.value)}
                    readOnly
                    variant="result"
                    helperText="Valor calculado automaticamente"
                />
            </CalculationSection>

            {/* Seção 2: Cálculos */}
            <CalculationSection 
                title="Cálculos de Consumo"
            >
                <div className="sv-space-y-6">
                    {/* Grupo Esfera */}
                    <FieldGroup title="⚪ Cálculo de Esfera" columns={1}>
                        <SVInputField
                            label="Esfera (kg)"
                            value={campos.esfera}
                            onChange={(e) => handleChange('esfera', e.target.value)}
                            variant="calculation"
                            placeholder="Digite a quantidade em kg"
                        />
                        <div className='bloco'>
                            <label className='sv-label'>Resultado (kg/m²):</label>
                            <div className='resultado-input-container'>
                                <ResultDisplay
                                    label=""
                                    value={campos.resultadoEsferas}
                                    unit="kg/m²"
                                    editable={editarEsferas}
                                    onEdit={(newValue) => handleChange('resultadoEsferas', newValue)}
                                    actionButton={
                                        <SVButton
                                            variant={editarEsferas ? "success" : "info"}
                                            size="sm"
                                            onClick={handleEditEsfera}
                                        >
                                            {editarEsferas ? "🔒 Bloquear" : "✏️ Editar"}
                                        </SVButton>
                                    }
                                />
                            </div>
                        </div>
                    </FieldGroup>

                    {/* Grupo Tinta */}
                    <FieldGroup title="🎨 Cálculo de Tinta" columns={1}>
                        <SVInputField
                            label="Tinta (baldes)"
                            value={campos.tinta}
                            onChange={(e) => handleChange('tinta', e.target.value)}
                            variant="calculation"
                            placeholder="Digite a quantidade em baldes"
                        />
                        <div className='bloco'>
                            <label className='sv-label'>Resultado (m²/balde):</label>
                            <div className='resultado-input-container'>
                                <ResultDisplay
                                    label=""
                                    value={campos.resultadoTinta}
                                    unit="m²/balde"
                                    editable={editarTinta}
                                    onEdit={(newValue) => handleChange('resultadoTinta', newValue)}
                                    actionButton={
                                        <SVButton
                                            variant={editarTinta ? "success" : "info"}
                                            size="sm"
                                            onClick={handleEditTinta}
                                        >
                                            {editarTinta ? "🔒 Bloquear" : "✏️ Editar"}
                                        </SVButton>
                                    }
                                />
                            </div>
                        </div>
                    </FieldGroup>
                </div>
            </CalculationSection>
        </div>
    ), [campos, editarEsferas, editarTinta, handleChange, handleEditEsfera, handleEditTinta]);

    // Layout Desktop - memoizado para evitar re-renders
    const DesktopLayout = useCallback(() => (
        <div className="sv-space-y-4">
            {/* Seção 1: Total m² */}
            <CalculationSection 
                title="Total da Pista"
            >
                <SVInputField
                    label="📐 Total m²"
                    value={campos.totalMetrosPista}
                    onChange={(e) => handleChange('totalMetrosPista', e.target.value)}
                    readOnly
                    variant="result"
                    helperText="Valor calculado automaticamente"
                />
            </CalculationSection>

            {/* Seção 2: Cálculos em Tabela */}
            <CalculationSection 
                title="Cálculos de Consumo"
            >
                <CalculationTable 
                    headers={[
                        'Material', 
                        'Quantidade', 
                        'Resultado', 
                        'Unidade'
                    ]}
                >
                    <tr>
                        <td style={{ 
                            fontWeight: 'var(--sv-font-medium)',
                            width: '20%'
                        }}>
                            ⚪ Esfera
                        </td>
                        <td style={{ width: '35%' }}>
                            <SVInputField
                                value={campos.esfera}
                                onChange={(e) => handleChange('esfera', e.target.value)}
                                variant="calculation"
                                placeholder="kg"
                                containerClassName="!mb-0"
                            />
                        </td>
                        <td style={{ width: '35%' }}>
                            <SVInputField
                                value={campos.resultadoEsferas}
                                readOnly
                                variant="result"
                                containerClassName="!mb-0"
                            />
                        </td>
                        <td style={{ 
                            color: 'var(--sv-gray-600)',
                            width: '10%',
                            textAlign: 'center'
                        }}>
                            kg/m²
                        </td>
                    </tr>
                    <tr>
                        <td style={{ 
                            fontWeight: 'var(--sv-font-medium)',
                            width: '20%'
                        }}>
                            🎨 Tinta
                        </td>
                        <td style={{ width: '35%' }}>
                            <SVInputField
                                value={campos.tinta}
                                onChange={(e) => handleChange('tinta', e.target.value)}
                                variant="calculation"
                                placeholder="baldes"
                                containerClassName="!mb-0"
                            />
                        </td>
                        <td style={{ width: '35%' }}>
                            <SVInputField
                                value={campos.resultadoTinta}
                                readOnly
                                variant="result"
                                containerClassName="!mb-0"
                            />
                        </td>
                        <td style={{ 
                            color: 'var(--sv-gray-600)',
                            width: '10%',
                            textAlign: 'center'
                        }}>
                            m²/balde
                        </td>
                    </tr>
                </CalculationTable>
            </CalculationSection>
        </div>
    ), [campos, editarEsferas, editarTinta, handleChange, handleEditEsfera, handleEditTinta]);

    return (
        <div className="sv-container sv-fade-in">
            <PageTitle title="CÁLCULO DE CONSUMO" />
            
            <div className="calc-tinta-container">
                <ResponsiveCalculationLayout
                    mobileLayout={MobileLayout()}
                    desktopLayout={DesktopLayout()}
                    breakpoint={900}
                />

                {/* Seção de Ações */}
                <CalculationSection 
                    title=""
                >
                    <ActionButtons align="stretch">
                        <SVButton 
                            variant="error" 
                            size="lg" 
                            onClick={limparTudo}
                            className="modern-button"
                            style={{
                                border: '2px solid #ef4444',
                                boxShadow: '0 2px 4px rgba(239,68,68,0.1)'
                            }}
                        >
                            🗑️ Limpar Tudo
                        </SVButton>
                        <SVButton 
                            variant="info" 
                            size="lg" 
                            onClick={compartilharDados}
                            className="modern-button"
                            style={{
                                border: '2px solid #3b82f6',
                                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
                            }}
                        >
                            📤 Compartilhar
                        </SVButton>
                    </ActionButtons>
                </CalculationSection>
            </div>
        </div>
    );
};

export default TabelaConsumo;

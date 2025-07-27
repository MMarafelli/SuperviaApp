import { useState, useEffect } from 'react';
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
import '../../styles/shared.css';
import '../../design-system/styles/global.css';

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

    // Handler de valor geral
    const handleChange = (campo: keyof ICampos, valor: string) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [campo]: valor,
        }));
    };

    // Handlers de edição
    const handleEditEsfera = () => setEditarEsferas(!editarEsferas);
    const handleEditTinta = () => setEditarTinta(!editarTinta);

    // Cálculos
    const { resultadoEsferas, resultadoTinta } = useCalculos(campos);

    useEffect(() => {
        handleChange('resultadoEsferas', resultadoEsferas);
        handleChange('resultadoTinta', resultadoTinta);
    }, [resultadoEsferas, resultadoTinta]);

    // Layout Mobile
    const MobileLayout = () => (
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
                        <ResultDisplay
                            label="📊 Resultado (kg/m²)"
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
                        <ResultDisplay
                            label="📊 Resultado (m²/balde)"
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
                    </FieldGroup>
                </div>
            </CalculationSection>
        </div>
    );

    // Layout Desktop
    const DesktopLayout = () => (
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
                        'Unidade', 
                        'Ações'
                    ]}
                >
                    <tr>
                        <td style={{ padding: 'var(--sv-space-3)', fontWeight: 'var(--sv-font-medium)' }}>
                            ⚪ Esfera
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)' }}>
                            <SVInputField
                                value={campos.esfera}
                                onChange={(e) => handleChange('esfera', e.target.value)}
                                variant="calculation"
                                placeholder="kg"
                                containerClassName="!mb-0"
                            />
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)' }}>
                            <SVInputField
                                value={campos.resultadoEsferas}
                                onChange={(e) => handleChange('resultadoEsferas', e.target.value)}
                                readOnly={!editarEsferas}
                                variant={editarEsferas ? "default" : "result"}
                                containerClassName="!mb-0"
                                className={editarEsferas ? 'sv-valid' : ''}
                            />
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)', color: 'var(--sv-gray-600)' }}>
                            kg/m²
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)', textAlign: 'center' }}>
                            <SVButton
                                variant={editarEsferas ? "success" : "info"}
                                size="sm"
                                onClick={handleEditEsfera}
                            >
                                {editarEsferas ? "🔒" : "✏️"}
                            </SVButton>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: 'var(--sv-space-3)', fontWeight: 'var(--sv-font-medium)' }}>
                            🎨 Tinta
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)' }}>
                            <SVInputField
                                value={campos.tinta}
                                onChange={(e) => handleChange('tinta', e.target.value)}
                                variant="calculation"
                                placeholder="baldes"
                                containerClassName="!mb-0"
                            />
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)' }}>
                            <SVInputField
                                value={campos.resultadoTinta}
                                onChange={(e) => handleChange('resultadoTinta', e.target.value)}
                                readOnly={!editarTinta}
                                variant={editarTinta ? "default" : "result"}
                                containerClassName="!mb-0"
                                className={editarTinta ? 'sv-valid' : ''}
                            />
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)', color: 'var(--sv-gray-600)' }}>
                            m²/balde
                        </td>
                        <td style={{ padding: 'var(--sv-space-3)', textAlign: 'center' }}>
                            <SVButton
                                variant={editarTinta ? "success" : "info"}
                                size="sm"
                                onClick={handleEditTinta}
                            >
                                {editarTinta ? "🔒" : "✏️"}
                            </SVButton>
                        </td>
                    </tr>
                </CalculationTable>
            </CalculationSection>
        </div>
    );

    return (
        <div className="sv-container sv-fade-in">
            <PageTitle title="CÁLCULO DE CONSUMO" />
            
            <ResponsiveCalculationLayout
                mobileLayout={<MobileLayout />}
                desktopLayout={<DesktopLayout />}
                breakpoint={900}
            />

            {/* Seção de Ações */}
            <CalculationSection 
                title="🎯 Ações"
            >
                <ActionButtons align="stretch">
                    <SVButton variant="error" size="lg">
                        🗑️ Limpar Tudo
                    </SVButton>
                    <SVButton variant="info" size="lg">
                        📤 Compartilhar
                    </SVButton>
                </ActionButtons>
            </CalculationSection>
        </div>
    );
};

export default TabelaConsumo;

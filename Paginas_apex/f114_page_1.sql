prompt --application/set_environment
set define off verify off feedback off
whenever sqlerror exit sql.sqlcode rollback
--------------------------------------------------------------------------------
--
-- Oracle APEX export file
--
-- You should run the script connected to SQL*Plus as the Oracle user
-- APEX_220100 or as the owner (parsing schema) of the application.
--
-- NOTE: Calls to apex_application_install override the defaults below.
--
--------------------------------------------------------------------------------
begin
wwv_flow_imp.import_begin (
 p_version_yyyy_mm_dd=>'2022.04.12'
,p_release=>'22.1.0'
,p_default_workspace_id=>288728058155183636
,p_default_application_id=>114
,p_default_id_offset=>0
,p_default_owner=>'INV_PLANTA_FIACA'
);
end;
/
 
prompt APPLICATION 114 - FINCA FIACA
--
-- Application Export:
--   Application:     114
--   Name:            FINCA FIACA
--   Date and Time:   15:17 Wednesday July 8, 2026
--   Exported By:     ETOAPANTA
--   Flashback:       0
--   Export Type:     Page Export
--   Manifest
--     PAGE: 1
--   Manifest End
--   Version:         22.1.0
--   Instance ID:     211685807281184
--

begin
null;
end;
/
prompt --application/pages/delete_00001
begin
wwv_flow_imp_page.remove_page (p_flow_id=>wwv_flow.g_flow_id, p_page_id=>1);
end;
/
prompt --application/pages/page_00001
begin
wwv_flow_imp_page.create_page(
 p_id=>1
,p_user_interface_id=>wwv_flow_imp.id(288932585980214907)
,p_name=>'Configuración de Plantas e Infraestructura'
,p_alias=>'GESTION_PLANTAS'
,p_step_title=>'Configuración de Plantas e Infraestructura'
,p_autocomplete_on_off=>'OFF'
,p_inline_css=>wwv_flow_string.join(wwv_flow_t_varchar2(
'/* UPEC Styles for Plants Page */',
'.upec-badge {',
'    padding: 5px 12px;',
'    border-radius: 20px;',
'    font-size: 0.72rem;',
'    font-weight: 800;',
'    text-transform: uppercase;',
'    letter-spacing: 0.5px;',
'    display: inline-flex;',
'    align-items: center;',
'    gap: 6px;',
'    box-shadow: 0 1px 3px rgba(0,0,0,0.08);',
'}',
'.upec-badge--pending {',
'    background-color: #FFD45B !important;',
'    color: #7A6000 !important;',
'    border: 1px solid #E6B800;',
'}',
'.upec-badge--revision {',
'    background-color: #f1f5f9 !important;',
'    color: #475569 !important;',
'    border: 1px solid #cbd5e1;',
'}',
'.upec-badge--resolved {',
'    background-color: #eafaf1 !important;',
'    color: #056734 !important;',
'    border: 1px solid #056734;',
'}',
'/* Custom APEX Region Styling */',
'.t-Region-header {',
'    background-color: #fafafa;',
'}',
'button.t-Button--hot {',
'    background-color: #056734 !important;',
'    border-color: #056734 !important;',
'    color: #ffffff !important;',
'}',
'button.t-Button--hot:hover {',
'    background-color: #044b25 !important;',
'    border-color: #044b25 !important;',
'}',
'.btn-orange {',
'    background-color: #FFD45B !important;',
'    border-color: #E6B800 !important;',
'    color: #7A6000 !important;',
'}',
'.btn-orange:hover {',
'    background-color: #E6B800 !important;',
'    border-color: #CC9E00 !important;',
'}'))
,p_page_template_options=>'#DEFAULT#'
,p_protection_level=>'C'
,p_last_updated_by=>'ETOAPANTA'
,p_last_upd_yyyymmddhh24miss=>'20260708152000'
);

-- Breadcrumb Region
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(288968440649281329)
,p_plug_name=>'Breadcrumb'
,p_region_template_options=>'#DEFAULT#:t-BreadcrumbRegion--useBreadcrumbTitle'
,p_component_template_options=>'#DEFAULT#'
,p_plug_template=>wwv_flow_imp.id(288822573874214863)
,p_plug_display_sequence=>10
,p_plug_display_point=>'REGION_POSITION_01'
,p_menu_id=>wwv_flow_imp.id(288737619142214833)
,p_plug_source_type=>'NATIVE_BREADCRUMB'
,p_menu_template_id=>wwv_flow_imp.id(288909259584214891)
);

-- Region: Formulario A
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(1140101000000002)
,p_plug_name=>'Formulario A: Crear Nueva Planta Piloto'
,p_region_template_options=>'#DEFAULT#:t-Region--scrollBody'
,p_plug_template=>wwv_flow_imp.id(288824147775214863)
,p_plug_display_sequence=>20
,p_plug_display_point=>'BODY'
,p_plug_grid_column_span=>6
,p_plug_display_column=>1
,p_plug_source=>'<p class="text-xs text-slate-500 mt-2"><i class="fa fa-info-circle text-upecGreen"></i> Al presionar "Crear Planta", el motor JS/APEX registrará automáticamente la nueva planta piloto en los selectores.</p>'
);

-- Region: Formulario B
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(1140101000000003)
,p_plug_name=>'Formulario B: Reportar Problema de Infraestructura'
,p_region_template_options=>'#DEFAULT#:t-Region--scrollBody'
,p_plug_template=>wwv_flow_imp.id(288824147775214863)
,p_plug_display_sequence=>30
,p_plug_display_point=>'BODY'
,p_plug_grid_column_span=>6
,p_plug_display_column=>7
);

-- Region: Reporte Incidencias
wwv_flow_imp_page.create_page_plug(
 p_id=>wwv_flow_imp.id(1140101000000004)
,p_plug_name=>'Reporte: Incidencias de Infraestructura Registradas'
,p_region_template_options=>'#DEFAULT#:t-Region--scrollBody'
,p_plug_template=>wwv_flow_imp.id(288824147775214863)
,p_plug_display_sequence=>40
,p_plug_display_point=>'BODY'
,p_plug_grid_column_span=>12
,p_plug_display_column=>1
,p_plug_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'SELECT ',
'    I.CODIGO AS ID,',
'    P.NOMBRE AS PLANTA_PILOTO,',
'    I.TIPO_FALLA,',
'    I.DETALLES AS DETALLES_OBSERVACIONES,',
'    TO_CHAR(I.FECHA_REPORTE, ''YYYY-MM-DD'') AS FECHA_REPORTE,',
'    CASE I.ESTADO_ATENCION',
'        WHEN ''PENDIENTE'' THEN ''<span class="upec-badge upec-badge--pending"><i class="fa fa-clock-o"></i> Pendiente Decanato</span>''',
'        WHEN ''EN REVISION'' THEN ''<span class="upec-badge upec-badge--revision"><i class="fa fa-refresh fa-spin"></i> En Revisión</span>''',
'        WHEN ''RESUELTO'' THEN ''<span class="upec-badge upec-badge--resolved"><i class="fa fa-check-circle"></i> Resuelto</span>''',
'        ELSE I.ESTADO_ATENCION',
'    END AS ESTADO',
'FROM PFI_TAB_INCIDENCIAS I',
'JOIN PFI_TAB_PLANTAS P ON I.CODIGO_PLANTA = P.CODIGO',
'ORDER BY I.CODIGO DESC'))
,p_plug_source_type=>'NATIVE_SQL_REPORT'
,p_plug_query_options=>'DERIVED_REPORT_COLUMNS'
);


-- -----------------------------------------------------------------------------
-- BOTONES DE PÁGINA
-- -----------------------------------------------------------------------------

-- Botón Crear Planta
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(1140102000000001)
,p_button_sequence=>10
,p_button_plug_id=>wwv_flow_imp.id(1140101000000002)
,p_button_name=>'BTN_CREAR_PLANTA'
,p_button_action=>'SUBMIT'
,p_button_template_options=>'#DEFAULT#:t-Button--iconLeft'
,p_button_is_hot=>'Y'
,p_button_image_alt=>'Crear Planta (Inyección Global APEX)'
,p_button_position=>'CREATE'
,p_icon_css_classes=>'fa-plus-circle'
);

-- Botón Guardar Incidencia
wwv_flow_imp_page.create_page_button(
 p_id=>wwv_flow_imp.id(1140102000000002)
,p_button_sequence=>20
,p_button_plug_id=>wwv_flow_imp.id(1140101000000003)
,p_button_name=>'BTN_GUARDAR_PROBLEMA'
,p_button_action=>'SUBMIT'
,p_button_template_options=>'#DEFAULT#:t-Button--iconLeft:btn-orange'
,p_button_is_hot=>'Y'
,p_button_image_alt=>'Guardar Problema Físico'
,p_button_position=>'CREATE'
,p_icon_css_classes=>'fa-paper-plane'
);


-- -----------------------------------------------------------------------------
-- ITEMS DE PÁGINA
-- -----------------------------------------------------------------------------

-- P1_NOMBRE_PLANTA
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(1140103000000001)
,p_name=>'P1_NOMBRE_PLANTA'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_imp.id(1140101000000002)
,p_prompt=>'Nombre de la Nueva Planta Piloto *'
,p_display_as=>'NATIVE_TEXT_FIELD'
,p_cSize=>60
,p_cMaxlength=>250
);

-- P1_CODIGO_PLANTA
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(1140103000000002)
,p_name=>'P1_CODIGO_PLANTA'
,p_item_sequence=>10
,p_item_plug_id=>wwv_flow_imp.id(1140101000000003)
,p_prompt=>'Seleccionar Planta Piloto *'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'SELECT NOMBRE d, CODIGO r FROM PFI_TAB_PLANTAS WHERE ESTADO = ''ACTIVO'' ORDER BY NOMBRE'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Seleccionar Planta -'
);

-- P1_TIPO_FALLA
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(1140103000000003)
,p_name=>'P1_TIPO_FALLA'
,p_item_sequence=>20
,p_item_plug_id=>wwv_flow_imp.id(1140101000000003)
,p_prompt=>'Tipo de Falla *'
,p_display_as=>'NATIVE_SELECT_LIST'
,p_lov=>'STATIC:Goteras en Techo;Goteras en Techo,Fallo Eléctrico / Luminarias;Fallo Eléctrico / Luminarias,Pintura / Paredes;Pintura / Paredes,Otros;Otros'
,p_lov_display_null=>'YES'
,p_lov_null_text=>'- Seleccionar Falla -'
);

-- P1_DETALLES
wwv_flow_imp_page.create_page_item(
 p_id=>wwv_flow_imp.id(1140103000000004)
,p_name=>'P1_DETALLES'
,p_item_sequence=>30
,p_item_plug_id=>wwv_flow_imp.id(1140101000000003)
,p_prompt=>'Detalles u Observaciones del Problema *'
,p_display_as=>'NATIVE_TEXTAREA'
,p_cSize=>60
,p_cHeight=>4
);


-- -----------------------------------------------------------------------------
-- PROCESOS DE PÁGINA (SUBMIT HANDLERS)
-- -----------------------------------------------------------------------------

-- Proceso 1: Crear Planta
wwv_flow_imp_page.create_page_process(
 p_id=>wwv_flow_imp.id(1140104000000001)
,p_process_sequence=>10
,p_process_point=>'ON_SUBMIT_BEFORE_COMPUTATION'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Crear Planta'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'BEGIN',
'    INSERT INTO PFI_TAB_PLANTAS (NOMBRE, ESTADO, FECHA_REGISTRO)',
'    VALUES (:P1_NOMBRE_PLANTA, ''ACTIVO'', SYSDATE);',
'END;'))
,p_process_clob_language=>'PLSQL'
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_when_button_id=>wwv_flow_imp.id(1140102000000001)
,p_process_success_message=>'Nueva planta piloto registrada con éxito.'
);

-- Proceso 2: Guardar Incidencia
wwv_flow_imp_page.create_page_process(
 p_id=>wwv_flow_imp.id(1140104000000002)
,p_process_sequence=>20
,p_process_point=>'ON_SUBMIT_BEFORE_COMPUTATION'
,p_process_type=>'NATIVE_PLSQL'
,p_process_name=>'Guardar Incidencia'
,p_process_sql_clob=>wwv_flow_string.join(wwv_flow_t_varchar2(
'BEGIN',
'    INSERT INTO PFI_TAB_INCIDENCIAS (CODIGO_PLANTA, TIPO_FALLA, DETALLES, FECHA_REPORTE, ESTADO_ATENCION)',
'    VALUES (:P1_CODIGO_PLANTA, :P1_TIPO_FALLA, :P1_DETALLES, SYSDATE, ''PENDIENTE'');',
'END;'))
,p_process_clob_language=>'PLSQL'
,p_error_display_location=>'INLINE_IN_NOTIFICATION'
,p_process_when_button_id=>wwv_flow_imp.id(1140102000000002)
,p_process_success_message=>'Incidencia de infraestructura registrada correctamente.'
);

end;
/
prompt --application/end_environment
begin
wwv_flow_imp.import_end(p_auto_install_sup_obj => nvl(wwv_flow_application_install.get_auto_install_sup_obj, false));
commit;
end;
/
set verify on feedback on define on
prompt  ...done

import type { AmbassadorRow } from '@/lib/supabase'

const COLUMNS = [
  { label: 'Received', width: 128 },
  { label: 'Name', width: 160 },
  { label: 'Email', width: 196 },
  { label: 'WhatsApp', width: 132 },
  { label: 'City', width: 110 },
  { label: 'Instagram', width: 128 },
  { label: 'Community', width: 120 },
  { label: 'People they can bring', width: 140 },
  { label: 'Promotion', width: 180 },
  { label: 'Why they applied', width: 260 },
  { label: 'Attendance', width: 100 },
  { label: 'Language', width: 80 },
  { label: 'Status', width: 92 },
] as const

const STATUS_STYLE = {
  new: 'StatusNew',
  reviewing: 'StatusReview',
  accepted: 'StatusOk',
  declined: 'StatusNo',
} as const

export type ExportMeta = {
  total?: number
  query?: string
  status?: string
}

function xml(value: string) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function cell(style: string, type: 'String' | 'Number' | 'DateTime', value: string, extra = '') {
  return `<Cell ss:StyleID="${style}"${extra}><Data ss:Type="${type}">${xml(value)}</Data></Cell>`
}

function empty(style = 'Blank', span = 0) {
  const merge = span ? ` ss:MergeAcross="${span}"` : ''
  return `<Cell ss:StyleID="${style}"${merge}/>`
}

function rowXml(cells: string, height?: number) {
  const h = height ? ` ss:Height="${height}"` : ''
  return `<Row ss:AutoFitHeight="0"${h}>${cells}</Row>`
}

function dateValue(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return { type: 'String' as const, value: iso, style: 'Text' }
  return {
    type: 'DateTime' as const,
    value: date.toISOString().replace('Z', ''),
    style: 'Date',
  }
}

function mailHref(email: string) {
  return email ? ` ss:HRef="mailto:${xml(email)}"` : ''
}

function waHref(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits ? ` ss:HRef="https://wa.me/${digits}"` : ''
}

function igHref(handle: string) {
  const name = handle.replace(/^@/, '')
  return name ? ` ss:HRef="https://instagram.com/${xml(name)}"` : ''
}

function countByStatus(rows: AmbassadorRow[]) {
  return {
    new: rows.filter((row) => row.status === 'new').length,
    reviewing: rows.filter((row) => row.status === 'reviewing').length,
    accepted: rows.filter((row) => row.status === 'accepted').length,
    declined: rows.filter((row) => row.status === 'declined').length,
  }
}

function overviewSheet(rows: AmbassadorRow[], meta: ExportMeta, exported: Date) {
  const counts = countByStatus(rows)
  const when = exported.toISOString().slice(0, 16).replace('T', ' ')
  const filter =
    meta.status && meta.status !== 'all'
      ? `Status: ${meta.status}`
      : meta.query
        ? `Search: ${meta.query}`
        : 'Every application in this view'
  const span = 5

  return `<Worksheet ss:Name="Overview">
<Table ss:ExpandedColumnCount="6" ss:DefaultRowHeight="20">
<Column ss:Width="28"/>
<Column ss:Width="160"/>
<Column ss:Width="90"/>
<Column ss:Width="140"/>
<Column ss:Width="140"/>
<Column ss:Width="140"/>
${rowXml(empty('Night', span), 12)}
${rowXml(cell('Brand', 'String', 'BAILAIMOS', ' ss:MergeAcross="5"'), 36)}
${rowXml(cell('BrandSub', 'String', 'Marrakech  20-24 May 2027  /  Palm Plaza', ' ss:MergeAcross="5"'), 22)}
${rowXml(empty('Night', span), 10)}
${rowXml(cell('SheetPad', 'String', '', ' ss:MergeAcross="5"'), 10)}
${rowXml(cell('Title', 'String', 'Ambassador applications', ' ss:MergeAcross="5"'), 28)}
${rowXml(cell('Mute', 'String', `Exported ${when} UTC`, ' ss:MergeAcross="5"'), 18)}
${rowXml(cell('Mute', 'String', filter, ' ss:MergeAcross="5"'), 18)}
${rowXml(empty(), 8)}
${rowXml(cell('KpiGold', 'String', 'In this file') + cell('KpiGoldN', 'Number', String(rows.length)) + empty() + cell('KpiDark', 'String', 'In Studio') + cell('KpiDarkN', 'Number', String(meta.total ?? rows.length)), 32)}
${rowXml(empty(), 14)}
${rowXml(cell('Header', 'String', 'Status') + cell('Header', 'String', 'Count') + cell('Header', 'String', 'Share'), 24)}
${rowXml(cell('StatusNew', 'String', 'new') + cell('StatusNew', 'Number', String(counts.new)) + cell('StatusNew', 'String', share(counts.new, rows.length)), 22)}
${rowXml(cell('StatusReview', 'String', 'reviewing') + cell('StatusReview', 'Number', String(counts.reviewing)) + cell('StatusReview', 'String', share(counts.reviewing, rows.length)), 22)}
${rowXml(cell('StatusOk', 'String', 'accepted') + cell('StatusOk', 'Number', String(counts.accepted)) + cell('StatusOk', 'String', share(counts.accepted, rows.length)), 22)}
${rowXml(cell('StatusNo', 'String', 'declined') + cell('StatusNo', 'Number', String(counts.declined)) + cell('StatusNo', 'String', share(counts.declined, rows.length)), 22)}
${rowXml(empty(), 16)}
${rowXml(cell('Mute', 'String', 'Open the Ambassadors sheet for the full files. Header row is frozen. Status, email, WhatsApp and Instagram are ready to filter and click.', ' ss:MergeAcross="5"'), 42)}
</Table>
<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
<PageSetup><Layout x:Orientation="Landscape"/><Header x:Margin="0.3"/><Footer x:Margin="0.3" x:Data="Bailaimos Studio"/></PageSetup>
<FitToPage/><Print><FitWidth>1</FitWidth><FitHeight>1</FitHeight></Print>
<TabColorIndex>43</TabColorIndex>
</WorksheetOptions>
</Worksheet>`
}

function share(count: number, total: number) {
  if (!total) return '0%'
  return `${Math.round((count / total) * 100)}%`
}

function peopleSheet(rows: AmbassadorRow[]) {
  const columns = COLUMNS.map((item) => `<Column ss:Width="${item.width}"/>`).join('')
  const banner = rowXml(cell('Brand', 'String', 'BAILAIMOS  /  Ambassador files', ` ss:MergeAcross="${COLUMNS.length - 1}"`), 32)
  const note = rowXml(
    cell('BrandSub', 'String', `${rows.length} ${rows.length === 1 ? 'person' : 'people'}  /  20-24 May 2027`, ` ss:MergeAcross="${COLUMNS.length - 1}"`),
    20,
  )
  const gap = rowXml(empty('SheetPad', COLUMNS.length - 1), 8)
  const head = rowXml(
    COLUMNS.map((item) => cell('Header', 'String', item.label)).join(''),
    26,
  )
  const last = Math.max(rows.length + 4, 5)
  const body = rows
    .map((row, index) => {
      const alt = index % 2 === 1
      const text = alt ? 'TextAlt' : 'Text'
      const wrap = alt ? 'WrapAlt' : 'Wrap'
      const date = dateValue(row.created_at)
      const statusStyle = STATUS_STYLE[row.status] || 'Text'
      return rowXml(
        [
          cell(alt ? 'DateAlt' : date.style, date.type, date.value),
          cell(text, 'String', row.name),
          cell(alt ? 'LinkAlt' : 'Link', 'String', row.email, mailHref(row.email)),
          cell(alt ? 'LinkAlt' : 'Link', 'String', row.whatsapp, waHref(row.whatsapp)),
          cell(text, 'String', row.city),
          cell(alt ? 'LinkAlt' : 'Link', 'String', row.instagram, igHref(row.instagram)),
          cell(text, 'String', row.community),
          cell(text, 'String', row.people),
          cell(wrap, 'String', row.promote),
          cell(wrap, 'String', row.why),
          cell(text, 'String', row.attend),
          cell(text, 'String', row.locale),
          cell(statusStyle, 'String', row.status),
        ].join(''),
        row.why || row.promote ? 36 : 22,
      )
    })
    .join('')

  return `<Worksheet ss:Name="Ambassadors">
<Names><NamedRange ss:Name="_FilterDatabase" ss:RefersTo="=Ambassadors!R4C1:R${last}C${COLUMNS.length}" ss:Hidden="1"/></Names>
<Table ss:ExpandedColumnCount="${COLUMNS.length}" ss:DefaultRowHeight="20">
${columns}
${banner}
${note}
${gap}
${head}
${body || rowXml(cell('Mute', 'String', 'No applications in this view.', ` ss:MergeAcross="${COLUMNS.length - 1}"`), 24)}
</Table>
<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
<Selected/>
<FreezePanes/>
<FrozenNoSplit/>
<SplitHorizontal>4</SplitHorizontal>
<TopRowBottomPane>4</TopRowBottomPane>
<ActivePane>2</ActivePane>
<PageSetup><Layout x:Orientation="Landscape"/><Header x:Margin="0.3"/><Footer x:Margin="0.3" x:Data="&amp;L Bailaimos Marrakech 2027 &amp;R Page &amp;P"/></PageSetup>
<FitToPage/><Print><ValidPrinterInfo/><FitWidth>1</FitWidth><FitHeight>0</FitHeight></Print>
<TabColorIndex>43</TabColorIndex>
</WorksheetOptions>
<AutoFilter x:Range="R4C1:R${last}C${COLUMNS.length}" xmlns="urn:schemas-microsoft-com:office:excel"/>
</Worksheet>`
}

const STYLES = `<Styles>
<Style ss:ID="Default" ss:Name="Normal">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#06140C"/>
  <Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="Night"><Interior ss:Color="#06140C" ss:Pattern="Solid"/></Style>
<Style ss:ID="SheetPad"><Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/></Style>
<Style ss:ID="Blank"><Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/></Style>
<Style ss:ID="Brand">
  <Alignment ss:Vertical="Center" ss:Horizontal="Left"/>
  <Font ss:FontName="Calibri" ss:Size="20" ss:Bold="1" ss:Color="#E6D04A"/>
  <Interior ss:Color="#06140C" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="BrandSub">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#F6F1DF"/>
  <Interior ss:Color="#0D2416" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="Title">
  <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#06140C"/>
  <Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="Mute">
  <Alignment ss:Vertical="Center" ss:WrapText="1"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#146033"/>
  <Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="Header">
  <Alignment ss:Vertical="Center" ss:WrapText="1"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0A1F12"/>
  <Interior ss:Color="#E6D04A" ss:Pattern="Solid"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#0A1F12"/>
  </Borders>
</Style>
<Style ss:ID="Text">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#06140C"/>
  <Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="TextAlt">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#06140C"/>
  <Interior ss:Color="#EEE6C9" ss:Pattern="Solid"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="Wrap">
  <Alignment ss:Vertical="Center" ss:WrapText="1"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#06140C"/>
  <Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="WrapAlt">
  <Alignment ss:Vertical="Center" ss:WrapText="1"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#06140C"/>
  <Interior ss:Color="#EEE6C9" ss:Pattern="Solid"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="Date">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#06140C"/>
  <Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/>
  <NumberFormat ss:Format="dd\\-mmm\\-yyyy hh:mm"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="DateAlt">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#06140C"/>
  <Interior ss:Color="#EEE6C9" ss:Pattern="Solid"/>
  <NumberFormat ss:Format="dd\\-mmm\\-yyyy hh:mm"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="Link">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#146033" ss:Underline="Single"/>
  <Interior ss:Color="#F6F1DF" ss:Pattern="Solid"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="LinkAlt">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#146033" ss:Underline="Single"/>
  <Interior ss:Color="#EEE6C9" ss:Pattern="Solid"/>
  <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E8E0C4"/>
  </Borders>
</Style>
<Style ss:ID="StatusNew">
  <Alignment ss:Vertical="Center" ss:Horizontal="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0A1F12"/>
  <Interior ss:Color="#E6D04A" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="StatusReview">
  <Alignment ss:Vertical="Center" ss:Horizontal="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#06140C"/>
  <Interior ss:Color="#F3B7C8" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="StatusOk">
  <Alignment ss:Vertical="Center" ss:Horizontal="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#F6F1DF"/>
  <Interior ss:Color="#146033" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="StatusNo">
  <Alignment ss:Vertical="Center" ss:Horizontal="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#F6F1DF"/>
  <Interior ss:Color="#7D8878" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="KpiGold">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#0A1F12"/>
  <Interior ss:Color="#E6D04A" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="KpiGoldN">
  <Alignment ss:Vertical="Center" ss:Horizontal="Center"/>
  <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#0A1F12"/>
  <Interior ss:Color="#E6D04A" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="KpiDark">
  <Alignment ss:Vertical="Center"/>
  <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#F6F1DF"/>
  <Interior ss:Color="#0D2416" ss:Pattern="Solid"/>
</Style>
<Style ss:ID="KpiDarkN">
  <Alignment ss:Vertical="Center" ss:Horizontal="Center"/>
  <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#E6D04A"/>
  <Interior ss:Color="#0D2416" ss:Pattern="Solid"/>
</Style>
</Styles>`

export function downloadAmbassadorsExcel(rows: AmbassadorRow[], meta: ExportMeta = {}) {
  const exported = new Date()
  const spreadsheet = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
<Title>Bailaimos ambassadors</Title>
<Author>Bailaimos Studio</Author>
<Created>${exported.toISOString()}</Created>
</DocumentProperties>
<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
<WindowHeight>14000</WindowHeight>
<ProtectStructure>False</ProtectStructure>
<ProtectWindows>False</ProtectWindows>
</ExcelWorkbook>
${STYLES}
${overviewSheet(rows, meta, exported)}
${peopleSheet(rows)}
</Workbook>`

  const blob = new Blob([`\uFEFF${spreadsheet}`], { type: 'application/vnd.ms-excel;charset=utf-8' })
  const href = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  link.download = `bailaimos-ambassadors-${exported.toISOString().slice(0, 10)}.xls`
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(href)
}

# react-tinacms-field-grid

A Flexbox grid builder field

## Getting Started

First, install the plugin with its peer dependencies:

```
npm i @tinalabs/react-tinacms-field-grid react react-dom tinacms react-tinacms-inline
```

## Usage

First, setup a Tina form inside an InlineForm:

```
export function PageBuilder(props) {
  const form = useForm(props);

  return (
    <InlineForm form={form}>
    </InlineForm>
  );
}
```

Now, you need to add your `InlineGrid`, which requires:

1. A row block and a column block
2. A set of UI blocks to render in the grid (these can be any blocks compatible with the [`InlineBlocks` component](https://tinacms.org/docs/ui/inline-editing/inline-blocks)).
3. A `name`, specifying where the `InlineGrid`'s data is stored on the form

First, let's create the row and column blocks.

```
import { BlocksControls } from 'react-tinacms-inline'

export const RowBlock = ({index, children}) => (
  <BlocksControls index={props.index}>
    <div style={{display: "flex"}}>
      {children}
    </div>
  </BlocksControls>
)

export const RowBlockTemplate = {
  label: 'Row',
  defaultItem: {
    columns: []
  }
  fields: []
}

export const RowBlockPreview = () => <RowBlock>This is a row</RowBlock>;

export default {
  Component: RowBlock,
  template: RowBlockTemplate,
  preview: RowBlockPreview
}
```

```
export const ColumnBlock = ({index, children}) => (
  <div style={{display: "flex"}}>
    <BlocksControls index={props.index}>
      {children}
    </BlocksControls>
  </div>
)

export const ColumnBlockTemplate = {
  label: 'Column',
  defaultItem: {
    blocks: []
  }
  fields: []
}

export const ColumnBlockPreview = () => <ColumnBlock>This is a column</ColumnBlock>;

export default {
  Component: RowBlock,
  template: RowBlockTemplate,
  preview: RowBlockPreview
}
```

Now, let's create a paragraph block to use in the grid.

```
export const ParagraphBlock = ({index, text}) => (
  <p>
    {children}
  </p>
)

export const ParagraphBlockTemplate = {
  label: 'Paragraph',
  defaultItem: {
    text: 'Hello world!',
  },
  fields: [
    { name: 'text', component: 'textarea', label: "Paragraph text"}
  ]
}

export const ParagraphBlockPreview = () => <ParagraphBlock text="This is a column" />;

export default {
  Component: ParagraphBlock,
  template: ParagraphBlockTemplate,
  preview: ParagraphBlockPreview
}
```

```
import RowBlock from "./RowBlock";
import ColumnBlock from "./ColumnBlock";
import ParagraphBlock from "./ParagraphBlock";

export function MyApp(props) {
  const form = useForm(props);
  const blocks = useMemo(() => {
    return {
      paragraph: ParagraphBlock
    }
  }, []);

  return (
    <InlineForm form={form}>
      <InlineGrid
        row={RowBlock}
        column={ColumnBlock}
        blocks={blocks}
      />
    </InlineForm>
  );
}
```

Now, open up your app and see the result:

- Add a row
- Add a column
- Add a paragraph
- Click the "settings" icon on the paragraph to edit the text!

### Adding Row and Column configuration

To add configuration for your row or column, such as setting how many column lengths a give column should span, you can update the template.

For example, to add a "colspan" attribute that updates the flex properties of the column, we'll first update the `defaultItem` of the column template:

```
export const ColumnBlockTemplate = {
  label: 'Column',
  defaultItem: {
    blocks: []
    colspan: 4
  }
  fields: []
}
```

Then we'll update the `fields` option of the column template to allow the colspan to be changed:

```
export const ColumnBlockTemplate = {
  label: 'Column',
  defaultItem: {
    blocks: []
    colspan: 4
  }
  fields: [
    { name: 'colspan', component: 'number', label: "Column span" }
  ]
}
```

Lastly, we'll update the actual component to use the value by:

- Passing in colspan via the `data` prop passed to the block, defaulting to `4` (one third) if not provided
- Creating a function to take a column span (1-12) to a percentage width
- Set the `flex-basis` and `max-width` styles of the column

```
export function ColumnBlock = ({index, data, children}) {
  const colspan = data.colspan ?? 3;
  const round = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  const width = round(100 / colspan, 2) * 100;
  
  return (
    <div style={{flexBasis: width + "%", maxWidth: width + "%"}}>
      <BlocksControls index={props.index}>
        {children}
      </BlocksControls>
    </div>
  )
)
```

Now columns have a settings modal to configure their column span.

### Providing default column(s)

If you want new rows to default to having a certain number of columns, we can update the rows template.

For example, to default to three columns in every row, add 3 columns to the row template's `defaultItem`.

```
export const RowBlockTemplate = {
  label: 'Row',
  defaultItem: {
    columns: [
      {
        _template: "column",
        blocks: []
      },
      {
        _template: "column",
        blocks: []
      },
      {
        _template: "column",
        blocks: []
      }
    ]
  }
  fields: []
}
```

### Providing default block(s)

If you want new columns to default to having a certain set of blocks, we can update the columns template.

For example, if we wanted every new column to have a paragraph when created:

```
export const ColumnBlockTemplate = {
  label: 'Column',
  defaultItem: {
    blocks: [
      {
        _template: "paragraph",
        text: "Hello world, I'm a default paragraph!"
      }
    ]
  }
  fields: []
}
```
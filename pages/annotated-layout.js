// import React from 'react';
// import {
//     Button,
//     Card,
//     Form,
//     FormLayout,
//     Layout,
//     SettingToggle,
//     Page,
//     Stack,
//     TextField,
//     TextStyle,
//   } from '@shopify/polaris';
  
//   class AnnotatedLayout extends React.Component {
//     state = {
//       discount: '10%',
//       enabled: false,
//     };
  
//     render() {
//       const { discount, enabled } = this.state;
//       const contentStatus = enabled ? 'Disable' : 'Enable';
//       const textStatus = enabled ? 'enabled' : 'disabled';

//       return (
//         <Page>
//           <Layout>
//             <Layout.AnnotatedSection
//               title="Default discount"
//               description="Add a product to Sample App, it will automatically be discounted."
//             >
//               <Card sectioned>
//                 <Form onSubmit={this.handleSubmit}>
//                   <FormLayout>
//                     <TextField
//                       value={discount}
//                       onChange={this.handleChange('discount')}
//                       label="Discount percentage"
//                       type="discount"
//                     />
//                     <Stack distribution="trailing">
//                       <Button primary submit>
//                         Save
//                       </Button>
//                     </Stack>
//                   </FormLayout>
//                 </Form>
//               </Card>
//             </Layout.AnnotatedSection>
//             <Layout.AnnotatedSection
//                 title="Price updates"
//                 description="Temporarily disable all Sample App price updates"
//             >
//                 <SettingToggle
//                 action={{
//                     content: contentStatus,
//                     onAction: this.handleToggle,
//                 }}
//                 enabled={enabled}
//                 >
//                     This setting is{' '}
//                     <TextStyle variation="strong">{textStatus}</TextStyle>.
//                 </SettingToggle>
//             </Layout.AnnotatedSection>
//           </Layout>
//         </Page>
//       );
//     }
  
//     handleSubmit = () => {
//       this.setState({
//         discount: this.state.discount,
//       });
//       console.log('submission', this.state);
//     };
  
//     handleChange = (field) => {
//       return (value) => this.setState({ [field]: value });
//     };
//     handleToggle = () => {
//         this.setState(({ enabled }) => {
//           return { enabled: !enabled };
//         });
//       };
//   }
  
//   export default AnnotatedLayout;
import React, {useCallback, useState} from 'react';
import {Stack, Caption, DropZone, Page, Thumbnail} from '@shopify/polaris';

export default function DropZoneWithDropOnPageExample() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...dropFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.indexOf(file.type) > 0
                ? window.URL.createObjectURL(file)
                : 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304'
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Page
      breadcrumbs={[{content: 'Products'}]}
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <DropZone dropOnPage onDrop={handleDropZoneDrop}>
        {uploadedFiles}
      </DropZone>
    </Page>
  );
}

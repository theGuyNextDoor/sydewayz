import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import theme from '../../public/theme';
import styles from '../../public/styles/Form';

// function Form({ handleModalView }) {
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       subject: '',
//       description: '',
//       email: '',
//     },
//   });

//   const onSubmit = (form) => {
//     reset({
//       subject: '',
//       description: '',
//     });
//     console.log(form);
//   };

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.subjectContainer}>

//         <View style={styles.subjectHeader}>
//           <Text>subject:</Text>
//           <Text onPress={() => handleModalView('none')}>X</Text>

//         </View>

//         <View style={styles.subjectInputContainer}>
//           <Controller
//             control={control}
//             rules={{ required: true, maxLength: 20 }}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 style={styles.subjectInput}
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//               />
//             )}
//             name="subject"
//           />
//           {errors.subject && <Text>error subject uncomment for production</Text>}
//           {/* {errors.subject?.type === 'required' && <Text>subject is required</Text>} */}
//           {/* {errors.subject?.type === 'maxLength' && <Text>subject cannot exceed 20</Text>} */}
//         </View>
//       </View>
//       <View style={styles.descriptionContainer}>
//         <Text>description:</Text>
//         <Controller
//           control={control}
//           rules={{ required: true, maxLength: 200 }}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={styles.descriptionInput}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//           name="description"
//         />
//         {errors.description && <Text>error description uncomment for production</Text>}
//         {/* {errors.description?.type === 'required' && <Text>description is required</Text>} */}
//         {/* {errors.description?.type === 'maxLength' && <Text>description cannot exceed 200</Text>} */}
//       </View>

//       <Button
//         title="Clear"
//         onPress={() => {
//           reset({
//             subject: '',
//             description: '',
//           });
//         }}
//       />

//       <Button
//         title="Submit"
//         onPress={handleSubmit(onSubmit)}
//       />
//     </View>
//   );
// }

// export default Form;

function Form({ handleModalView }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: '',
      description: '',
      email: '',
    },
  });

  const onSubmit = (form) => {
    reset({
      subject: '',
      description: '',
    });
    console.log(form);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <View style={styles.subjectContainer}>
          <Text>subject:</Text>
          <Text onPress={() => handleModalView('none')}>X</Text>
        </View>

        <Controller
          control={control}
          rules={{ required: true, maxLength: 20 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.subjectBox}
              // multiline="true"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="subject"
        />
        {errors.subject && <Text>error subject uncomment for production</Text>}
        {/* {errors.subject?.type === 'required' && <Text>subject is required</Text>} */}
        {/* {errors.subject?.type === 'maxLength' && <Text>subject cannot exceed 20</Text>} */}

        <Text>description:</Text>

        <Controller
          control={control}
          rules={{ required: true, maxLength: 200 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.descriptionBox}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && <Text>error description uncomment for production</Text>}
        {/* {errors.description?.type === 'required' && <Text>description is required</Text>} */}
        {/* {errors.description?.type === 'maxLength' && <Text>description cannot exceed 200</Text>} */}

        <View styles={styles.buttonContainer}>
          <Button
            title="Clear"
            onPress={() => {
              reset({
                subject: '',
                description: '',
              });
            }}
          />

          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
}

export default Form;

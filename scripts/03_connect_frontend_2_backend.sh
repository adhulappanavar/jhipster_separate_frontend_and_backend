cd frontend-webapp/CustomerUI


sed -i '' "s|isAuthenticated = action.payload && action.payload.data && action.payload.data.activated|isAuthenticated = true|g" src/main/webapp/app/shared/reducers/authentication.ts

sed -i '' "1,/target/s/target/target2/"  webpack/webpack.dev.js 
sed -i '' "s|target2:|target: \`http://13.87.224.189:8761\`, // |g"  webpack/webpack.dev.js 

sed -i '' "s|'api/addresses'|'services/customerservice/api/addresses'|g" src/main/webapp/app/entities/address/address.reducer.ts

sed -i '' "s|'api/customers'|'services/customerservice/api/customers'|g" src/main/webapp/app/entities/customer/customer.reducer.ts

sed -i '' "s|'api/account'|'services/customerservice/api/account'|g" src/main/webapp/app/modules/account/password/password.reducer.ts

sed -i '' "s|'api/account/reset-password'|'services/customerservice/api/account/reset-password'|g" src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts

sed -i '' "s|'api/account'|'services/customerservice/api/account'|g" src/main/webapp/app/modules/account/settings/settings.reducer.ts

sed -i '' "s|'api/users'|'services/customerservice/api/users'|g" src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts

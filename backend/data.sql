INSERT INTO foodtypes (TypeId, NameType, ParentId) VALUES
(1, 'Vietnamese Noodles', false),
(2, 'Grilled Dishes', false),
(3, 'Rice Dishes', false),
(4, 'Vegetarian', false),
(5, 'Soups', false),
(6, 'Seafood', false),
(7, 'Snacks', false),
(8, 'Desserts', false),
(9, 'Beverages', false),
(10, 'Salads', false);


INSERT INTO foods (FoodId, Name, Image1, Image2, Image3, TypeId, Rating, NumberRating, Price, Itemleft) VALUES
(1, 'Phở bò', 'https://fohlafood.vn/cdn/shop/articles/bi-quyet-nau-phi-bo-ngon-tuyet-dinh.jpg?v=1712213789', 'https://tiki.vn/blog/wp-content/uploads/2023/07/thumb-12.jpg', 'https://amivietnam.com/wp-content/uploads/2024/03/image-242-1150x800.png', 1, 0, 0, 50000, 12),
(2, 'Phở gà', 'https://cdn.tgdd.vn/2021/09/CookProduct/1200(3)-1200x676-2.jpg', 'https://noiphodien123.vn/wp-content/uploads/2023/08/cach-nau-pho-ga-ha-noi.jpg', 'https://cachnau.vn/wp-content/uploads/2022/02/pho-ga-ga-noi.jpg', 1, 0, 0, 45000, 23),
(3, 'Bún chả', 'https://cachnau.vn/wp-content/uploads/2022/02/pho-ga-ga-noi.jpg', 'https://kipor.vn//upload/images/lam-bun-cha-bang-noi-chien-khong-dau-6.jpg', 'https://top10tphcm.com/wp-content/uploads/2021/01/Quan-bun-cha-ha-noi-o-TPHCM.jpg', 2, 0, 0, 70000, 10),
(4, 'Nem nướng', 'https://i.ytimg.com/vi/I_n1IQggIQ4/maxresdefault.jpg', 'https://vcdn1-giadinh.vnecdn.net/2021/11/22/256046871-2647385258740674-189-7570-7298-1637563536.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=qUwIfHQjysmE4qAxSuXtbw', 'https://top10tphcm.com/wp-content/uploads/2021/01/Quan-bun-cha-ha-noi-o-TPHCM.jpg', 2, 0, 0, 60000, 24),
(5, 'Cơm tấm', 'https://bizweb.dktcdn.net/100/442/328/files/hi-nh-avatar-website-cnsg.jpg?v=1644485704509', 'https://images2.thanhnien.vn/528068263637045248/2023/7/20/base64-16898350173331230391375.png', 'https://file.hstatic.net/1000394081/article/com-tam_e03b4325c9914def9d66619930a73432.jpg', 3, 0, 0, 55000, 21),
(6, 'Cơm chiên', 'https://image.baophapluat.vn/w840/Uploaded/2024/ycgvptcc/2020_05_28/cach-lam-com-chien-duong-chau-600x481_DLZM.jpg', 'https://i.ytimg.com/vi/_cdBAMq5KZ0/maxresdefault.jpg', 'https://cdn.tgdd.vn/2020/07/CookProduct/f-1200x676.jpg', 3, 0, 0, 65000, 22),
(7, 'Gỏi cuốn chay', 'https://khaihoanphuquoc.com.vn/wp-content/uploads/2023/11/nu%CC%9Bo%CC%9B%CC%81c-ma%CC%86%CC%81m-cha%CC%82%CC%81m-go%CC%89i-cuo%CC%82%CC%81n-1200x923.png', 'https://cdn.tgdd.vn/2021/08/CookRecipe/Avatar/goi-cuon-tom-thit-thumbnail-1.jpg', 'https://netspace.edu.vn/app_assets/images/2020/04/25/cach-lam-goi-cuon-tom-thit-cuc-ki-hap-dan-245587-800.jpg', 4, 0, 0, 35000, 18),
(8, 'Mì xào chay', 'https://i-giadinh.vnecdn.net/2022/08/08/Thanh-pham-3-3-7795-1659943657.jpg', 'https://anchay.cdn.vccloud.vn/wp-content/uploads/2021/09/mi-xao-chay-ngon-bo-duong-thoq.jpg', 'https://cdn.tgdd.vn/2020/07/CookProduct/1-1200x676-12.jpg', 4, 0, 0, 40000, 34),
(9, 'Canh chua cá', 'https://i.ytimg.com/vi/zNhazi2P4yI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCGDf9GlJVxCRR7KD0LBzoFAwEO-Q', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQldivONiT8mdxnMuWY5m3dyCYjMPToTjWKDg&s', 'https://static-images.vnncdn.net/files/publish/2023/3/14/canh-ca-a-1024.jpg', 5, 0, 0, 55000, 32),
(10, 'Bò Kho', 'https://i-giadinh.vnecdn.net/2021/03/15/1-1615818742-7067-1615818945.jpg', 'https://i-giadinh.vnecdn.net/2021/03/15/1-1615818742-7067-1615818945.jpg', 'https://i.ytimg.com/vi/FXSTfjiEA0M/maxresdefault.jpg', 5, 0, 0, 60000, 12),

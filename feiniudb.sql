/*
Navicat MySQL Data Transfer

Source Server         : feiniu
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : feiniudb

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-02-09 17:13:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `star` int(1) unsigned NOT NULL COMMENT '星级',
  `content` varchar(255) NOT NULL COMMENT '评论内容',
  `customer` varchar(255) NOT NULL COMMENT '买家，评论员',
  `city` varchar(255) DEFAULT NULL COMMENT '买家所在城市',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '评论发表时间',
  `goods` int(10) unsigned NOT NULL COMMENT '评论的商品id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '5', '商品很不错，很好吃，物流很快，卖家服务态度非常好，绝对五星好评', '13413611594', '广州', '2018-02-09 09:48:22', '1');
INSERT INTO `comment` VALUES ('2', '4', '挺好吃的，很香，给卖家打call', '13413611595', '澳门', '2018-02-09 09:48:54', '4');
INSERT INTO `comment` VALUES ('3', '1', '差评，太难吃了，卖家态度贼差，一周才送到，一星都不想给', '13413611590', '香港', '2018-02-09 09:48:34', '10');
INSERT INTO `comment` VALUES ('4', '3', '国美客服服务质量是真的差 答非所问 知道不知道给个话就好了 非得岔开话题 像看不见我说话一样 商品还可以 为客服也只能打三星了', '13344422144', '台湾', '2018-02-09 10:48:16', '1');
INSERT INTO `comment` VALUES ('5', '3', '还好，价格实惠，就是一包量太少了', '13413611594', '广州', '2018-02-09 14:41:19', '1');
INSERT INTO `comment` VALUES ('6', '5', '五星好评，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈呵呵呵呵呵哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', '13413611594', '广州', '2018-02-09 14:54:20', '1');
INSERT INTO `comment` VALUES ('7', '1', '**!!!!**，**食品，****', '13413611594', '广州', '2018-02-09 15:00:41', '1');
INSERT INTO `comment` VALUES ('8', '4', '挺不错，还会在光顾', '13413611594', '广州', '2018-02-09 15:07:02', '1');
INSERT INTO `comment` VALUES ('9', '2', '二星测试', '13413611594', '广州', '2018-02-09 15:12:25', '1');
INSERT INTO `comment` VALUES ('10', '3', '数量测试', '13413611594', '广州', '2018-02-09 15:18:52', '1');
INSERT INTO `comment` VALUES ('11', '5', '总体测试', '13413611594', '广州', '2018-02-09 15:19:42', '1');
INSERT INTO `comment` VALUES ('12', '5', '分页按钮测试1', '13413611594', '广州', '2018-02-09 15:25:58', '1');
INSERT INTO `comment` VALUES ('13', '5', '分页按钮测试2', '13413611594', '广州', '2018-02-09 15:26:09', '1');
INSERT INTO `comment` VALUES ('14', '5', '分页按钮测试3', '13413611594', '广州', '2018-02-09 15:26:19', '1');
INSERT INTO `comment` VALUES ('15', '3', '发表评价固定页码测试', '13413611594', '广州', '2018-02-09 15:39:19', '1');
INSERT INTO `comment` VALUES ('16', '3', '发表评价固定页码测试2', '13413611594', '广州', '2018-02-09 15:40:16', '1');
INSERT INTO `comment` VALUES ('17', '3', '发表评价固定页码测试3', '13413611594', '广州', '2018-02-09 15:40:26', '1');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `comment` int(11) DEFAULT NULL,
  `shop` varchar(255) DEFAULT NULL,
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '商品创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '../img/goods1', '自营 印尼进口 啪啪通Papatonk虾片 原味海苔味冬荫功味组合装 40g*3/�?膨化 零食', '16.90', '75', '飞牛自营', '2018-02-08 21:19:54');
INSERT INTO `goods` VALUES ('2', '../img/goods2', '韩国进口零食 九日jiur 辣祖辣炒年糕00g 休闲零食自营', '15.89', '35', '通通优品食品专营店', '2018-02-08 21:21:54');
INSERT INTO `goods` VALUES ('3', '../img/goods3', '中国台湾进口 北田米饼（蛋黄口味） 100g 自营', '16.90', '210', '飞牛自营', '2018-02-07 17:18:56');
INSERT INTO `goods` VALUES ('4', '../img/goods4', '飞牛自营 台湾进口 多力多滋超浓芝士味玉米片65g 零食 台湾食品', '10.90', '67', '通通优品食品专营店', '2018-02-08 21:21:48');
INSERT INTO `goods` VALUES ('5', '../img/goods5', '飞牛自营 台湾进口 多力多滋烟熏烤味玉米�?5g 休闲零食 进口玉米�?', '10.90', '200', '飞牛自营', '2018-02-07 17:19:01');
INSERT INTO `goods` VALUES ('6', '../img/goods6', '啪啪通虾片原味海苔味冬荫功味85g*3袋套�?', '32.50', '4', '飞牛自营', '2018-02-07 17:19:06');
INSERT INTO `goods` VALUES ('7', '../img/goods7', '飞牛自营 中国台湾进口 北田米饼（牛奶口味） 100g 自营', '16.00', '9', '飞牛自营', '2018-02-07 09:12:48');
INSERT INTO `goods` VALUES ('8', '../img/goods8', '飞牛自营 台湾进口 多力多滋烟熏烤味玉米�?98.4g 零食 台湾食品', '26.00', '15', '圣森进口食品专营', '2018-02-08 21:20:18');
INSERT INTO `goods` VALUES ('9', '../img/goods9', '飞牛自营 台湾进口 多力多滋烟熏烤味玉米�?98.4g 零食 台湾食品', '26.00', '0', '飞牛自营', '2018-02-07 09:12:48');
INSERT INTO `goods` VALUES ('10', '../img/goods10', '飞牛自营 台湾进口 张君雅和风鸡汁拉面条�?5g 零食', '8.90', '0', '飞牛自营', '2018-02-07 17:19:13');
INSERT INTO `goods` VALUES ('11', '../img/goods11', '飞牛自营 台湾进口 张君雅草莓甜甜圈40g 零食', '10.00', '0', '飞牛自营', '2018-02-07 09:12:48');
INSERT INTO `goods` VALUES ('12', '../img/goods12', '飞牛自营 台湾进口北田米饼100g香蕉牛奶�?进口零食', '16.90', '0', '圣森进口食品专营', '2018-02-08 21:20:20');
INSERT INTO `goods` VALUES ('13', '../img/goods13', '飞牛自营 泰国进口小老板芝麻海苔天妇罗辣�?9g 零食', '10.00', '0', '飞牛自营', '2018-02-07 09:12:48');
INSERT INTO `goods` VALUES ('14', '../img/goods14', '飞牛自营 日本进口马鲁斯酥脆炸鱿鱼(芥末�?25g 零食', '13.90', '0', '飞牛自营', '2018-02-07 17:19:17');
INSERT INTO `goods` VALUES ('15', '../img/goods15', '飞牛自营 日本进口马鲁斯酥脆炸鱿鱼(奶酪�?25g 零食', '13.00', '0', '飞牛自营', '2018-02-07 09:12:48');
INSERT INTO `goods` VALUES ('16', '../img/goods16', '包邮 加拿大进口有机坚果大礼包(白色 食品)', '149.90', '0', '圣森进口食品专营', '2018-02-07 17:19:19');
INSERT INTO `goods` VALUES ('17', '../img/goods17', '印尼进口 奥嘉�?O’Garlos 蟹片 黑胡椒味30g 休闲零食 自营', '5.50', '0', '飞牛自营', '2018-02-07 17:19:21');
INSERT INTO `goods` VALUES ('18', '../img/goods18', '印度尼西亚进啪啪通Papatonk虾片冬荫功味40g 休闲零食 自营', '6.50', '0', '飞牛自营', '2018-02-07 17:19:23');
INSERT INTO `goods` VALUES ('19', '../img/goods19', '印尼进口 啪啪通Papatonk虾片 原味组合�?85g*2/�?自营', '16.90', '0', '飞牛自营', '2018-02-07 17:19:24');
INSERT INTO `goods` VALUES ('20', '../img/goods20', '印度尼西亚进�?啪啪通Papatonk虾片海苔�?0g 休闲零食 自营', '6.50', '0', '圣森进口食品专营', '2018-02-08 21:20:10');
INSERT INTO `goods` VALUES ('21', '../img/goods21', '印尼进口 奥嘉�?O’Garlos 虾片 烟熏三文鱼味30g 休闲零食 自营', '4.50', '0', '飞牛自营', '2018-02-07 17:19:27');
INSERT INTO `goods` VALUES ('22', '../img/goods22', '印度尼西亚进�?啪啪通Papatonk虾片原味40g 休闲零食自营', '6.50', '0', '通通优品食品专营店', '2018-02-08 21:20:41');
INSERT INTO `goods` VALUES ('23', '../img/goods23', '印尼进口 奥嘉�?O’Garlos 蟹片 烤蟹�?0g 休闲零食 自营', '5.50', '0', 'JIANYAN/柬燕食品', '2018-02-08 21:20:28');
INSERT INTO `goods` VALUES ('24', '../img/goods24', '印尼进口 奥嘉�?O’Garlos 蟹片 原味30g 休闲零食 自营', '5.90', '0', '飞牛自营', '2018-02-07 17:19:37');
INSERT INTO `goods` VALUES ('25', '../img/goods25', '印尼进口 啪啪通Papatonk虾片 海苔味组合装 85g*2/�?自营', '16.50', '0', '通通优品食品专营店', '2018-02-08 21:20:39');
INSERT INTO `goods` VALUES ('26', '../img/goods26', '印尼进口 啪啪�?Papatonk 鲜虾�?原味200g 休闲零食 自营', '14.50', '0', '飞牛自营', '2018-02-07 17:19:39');
INSERT INTO `goods` VALUES ('27', '../img/goods27', '印尼进口 啪啪�?Papatonk 鲜虾�?原味500g 休闲零食 自营', '25.60', '0', '飞牛自营', '2018-02-07 17:19:42');
INSERT INTO `goods` VALUES ('28', '../img/goods28', '印尼进口 奥嘉�?O’Garlos 虾片 奶酪�?0g 休闲零食 自营', '10.60', '0', 'JIANYAN/柬燕食品', '2018-02-08 21:20:30');
INSERT INTO `goods` VALUES ('29', '../img/goods29', '印尼进口 啪啪通Papatonk虾片 原味 海苔味组合装 85g*2/�?自营', '16.50', '0', '通通优品食品专营店', '2018-02-08 21:20:38');
INSERT INTO `goods` VALUES ('30', '../img/goods30', '印尼进口 啪啪�?Papatonk 虾片 切达奶酪�?50g 休闲零食 自营', '12.90', '0', '飞牛自营', '2018-02-07 17:19:50');
INSERT INTO `goods` VALUES ('31', '../img/goods31', '印尼进口 奥嘉�?O’Garlos 虾片 咖喱虾味30g 休闲零食 自营', '4.90', '0', '飞牛自营', '2018-02-07 17:19:55');
INSERT INTO `goods` VALUES ('32', '../img/goods32', '印尼进口 啪啪�?Papatonk 虾片 咖喱鸡味150g 休闲零食 自营', '12.60', '0', 'JIANYAN/柬燕食品', '2018-02-08 21:20:32');
INSERT INTO `goods` VALUES ('33', '../img/goods33', '印尼进口 奥嘉�?O’Garlos 虾片 火辣�?0g 休闲零食 自营', '10.90', '0', '飞牛自营', '2018-02-07 17:19:59');
INSERT INTO `goods` VALUES ('34', '../img/goods34', '印尼进口 啪啪通Papatonk虾片 冬荫功味组合�?85g*2/�?自营', '16.50', '0', '飞牛自营', '2018-02-07 17:20:03');
INSERT INTO `goods` VALUES ('35', '../img/goods35', '飞牛自营 张君雅巧克力甜甜�?5g 零食', '8.90', '0', '飞牛自营', '2018-02-07 17:20:05');
INSERT INTO `goods` VALUES ('36', '../img/goods36', '包邮 加拿大进口伊莉蓝莓干 进口零食', '34.50', '0', '圣森进口食品专营', '2018-02-07 17:20:06');
INSERT INTO `goods` VALUES ('37', '../img/goods37', '包邮 加拿大进口茵诺椰子薄脆堆 进口零食 进口饼干 进口糖果', '42.90', '0', '圣森进口食品专营', '2018-02-07 17:20:07');
INSERT INTO `goods` VALUES ('38', '../img/goods38', '马来西亚BIKA香脆鱼仔�?0g', '18.60', '0', '通通优品食品专营店', '2018-02-07 17:20:10');
INSERT INTO `goods` VALUES ('39', '../img/goods39', '马来西亚BIKA香脆海鲜�?0g', '18.60', '0', '通通优品食品专营店', '2018-02-07 17:20:14');
INSERT INTO `goods` VALUES ('40', '../img/goods40', '马来西亚BIKA菜味香薯�?0g', '18.90', '0', '通通优品食品专营店', '2018-02-07 17:20:17');
INSERT INTO `goods` VALUES ('41', '../img/goods41', 'JIANYAN/燕窝糕美容养颜美体塑身吃出来的美�?', '299.90', '0', 'JIANYAN/柬燕食品', '2018-02-07 17:20:20');

-- ----------------------------
-- Table structure for index_goods
-- ----------------------------
DROP TABLE IF EXISTS `index_goods`;
CREATE TABLE `index_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `cratetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of index_goods
-- ----------------------------
INSERT INTO `index_goods` VALUES ('1', 'img/index_1f_r_t2_1', '盐津铺子鱼豆腐(麻辣味)85g/袋', '7.50', '休闲零食', '2018-02-07 11:12:09');
INSERT INTO `index_goods` VALUES ('2', 'img/index_1f_r_t2_2', '白俄罗斯进口 迈咔 (MEGA CHIPS ) 薯片酸奶芝士味100g/盒 自营', '7.90', '休闲零食', '2018-02-07 11:12:10');
INSERT INTO `index_goods` VALUES ('3', 'img/index_1f_r_t2_3', '自营 中国台湾进口 北田能量99棒 蛋黄夹心180g袋装（17小包）休闲零食 膨化 米果卷', '11.90', '休闲零食', '2018-02-07 11:12:10');
INSERT INTO `index_goods` VALUES ('4', 'img/index_1f_r_t2_4', '自营 泰国进口 小老板 烤海苔卷 脆紫菜卷 原味32.4g盒装 休闲 办公小零食', '19.90', '休闲零食', '2018-02-07 11:12:11');
INSERT INTO `index_goods` VALUES ('5', 'img/index_1f_r_t2_5', '印尼进口 奥嘉莱 O’Garlos 蟹片 黑胡椒味30g 休闲零食 自营', '4.90', '休闲零食', '2018-02-07 11:12:12');
INSERT INTO `index_goods` VALUES ('6', 'img/index_1f_r_t2_6', '中国台湾进口 北田蒟蒻糙米卷（蛋黄口味）160g 自营', '11.90', '休闲零食', '2018-02-07 11:12:12');
INSERT INTO `index_goods` VALUES ('7', 'img/index_1f_r_t2_7', '中国台湾进口 北田蒟蒻糙米卷（芝士口味）160g 自营', '11.90', '休闲零食', '2018-02-07 11:12:13');
INSERT INTO `index_goods` VALUES ('8', 'img/index_1f_r_t2_8', '印度尼西亚进口 啪啪通Papatonk虾片原味40g 休闲零食自营', '5.90', '休闲零食', '2018-02-07 11:12:13');
INSERT INTO `index_goods` VALUES ('9', 'img/index_1f_r_t2_9', '印尼进口 啪啪通Papatonk虾片 原味 海苔味组合装 85g*2/包 自营', '15.90', '休闲零食', '2018-02-07 11:12:15');
INSERT INTO `index_goods` VALUES ('10', 'img/index_1f_r_t2_10', '印度尼西亚进口 啪啪通Papatonk虾片冬荫功味40g 休闲零食 自营', '5.90', '休闲零食', '2018-02-07 11:30:31');
INSERT INTO `index_goods` VALUES ('11', 'img/index_2f_r_t2_1', 'LG倍瑞傲 派缤按压式牙膏 285g（萌绿清新）', '69.00', '美发美肤', '2018-02-07 11:11:52');
INSERT INTO `index_goods` VALUES ('12', 'img/index_2f_r_t2_2', '李施德林全效护理漱口水250ml', '36.90', '美发美肤', '2018-02-07 11:11:53');
INSERT INTO `index_goods` VALUES ('13', 'img/index_2f_r_t2_3', '姬芮（ZA）净颜深层卸妆油100ml', '49.00', '美发美肤', '2018-02-07 11:11:54');
INSERT INTO `index_goods` VALUES ('14', 'img/index_2f_r_t2_4', '美宝莲雾感哑光绝色持久唇膏R09PM#3.9g', '109.90', '美发美肤', '2018-02-07 11:11:54');
INSERT INTO `index_goods` VALUES ('15', 'img/index_2f_r_t2_5', '韩束倍润亮颜修容霜红BB40ml', '69.90', '美发美肤', '2018-02-07 11:11:55');
INSERT INTO `index_goods` VALUES ('16', 'img/index_2f_r_t2_6', '谜尚魅力润透妆前乳40ml', '85.90', '美发美肤', '2018-02-07 11:11:56');
INSERT INTO `index_goods` VALUES ('17', 'img/index_2f_r_t2_7', '韩后水光遮瑕气垫霜15g(C21亮肤)', '129.90', '美发美肤', '2018-02-07 11:11:56');
INSERT INTO `index_goods` VALUES ('18', 'img/index_2f_r_t2_8', '欧莱雅纷泽琉金唇膏G101 3.7g', '125.00', '美发美肤', '2018-02-07 11:11:57');
INSERT INTO `index_goods` VALUES ('19', 'img/index_2f_r_t2_9', '兰欧媞红酒染唇液7g（OR01亮橘色）', '52.90', '美发美肤', '2018-02-07 11:11:58');
INSERT INTO `index_goods` VALUES ('20', 'img/index_2f_r_t2_10', '雅芳小金裙走珠香水9ml', '29.90', '美发美肤', '2018-02-07 11:12:00');
INSERT INTO `index_goods` VALUES ('21', 'img/index_3f_r_t2_1', '班图诗妮2017新款女装秋冬修身长款连衣裙女显瘦针织长袖裙碎花喇叭袖长裙(蓝色 XXL)', '83.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('22', 'img/index_3f_r_t2_2', '班图诗妮秋冬长袖针织连衣裙女2017新款女装冬季内搭打底毛衣裙加厚冬裙子(图片色 S)', '95.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('23', 'img/index_3f_r_t2_3', '【清仓598件】班图诗妮2017秋冬季新款女装长款毛衣裙过膝小香风长袖打底内搭针织连衣裙(咖啡色 S)', '89.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('24', 'img/index_3f_r_t2_4', '班图诗妮秋冬长袖女装新款韩版时尚格子连衣裙2017春季v领修身长款印花潮(L型花 XXL)', '89.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('25', 'img/index_3f_r_t2_5', '阿美氏女装加绒卫衣长款连衣裙 女士长裙子秋冬装简约修身包臀长袖连帽 YL8/022(黑色 XL)', '78.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('26', 'img/index_3f_r_t2_6', '千语禾高中初中生少女毛呢连衣裙加厚保暖娃娃领气质冬装新款女装长袖收腰A字打底裙潮', '100.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('27', 'img/index_3f_r_t2_7', '班图诗妮秋冬新款女装韩版中长款针织马甲背带裙两件套雪纺碎花连衣裙套装(.黑色 XXL)', '118.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('28', 'img/index_3f_r_t2_8', '烟花烫SD2017冬装新款女装气质修身绣花蕾丝中长毛呢连衣裙 凝妆(浅粉色 XXXL)', '318.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('29', 'img/index_3f_r_t2_9', '班图诗妮2017秋冬季新款韩版女装过膝针织连衣裙中长款打底衫宽松套头毛衣(卡其色 XL)', '69.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('30', 'img/index_3f_r_t2_10', '2017秋冬新款女装套装裙子背带裙两件套针织打底连衣裙(卡其色 XL)', '258.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('31', 'img/index_3f_r_t2_11', 'Mistletoe2017秋冬季女装长袖针织连衣裙韩版高领百褶针织裙(浅黄色 L)', '129.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('32', 'img/index_3f_r_t2_12', 'Mistletoe秋冬女装新款翻领A字裙 韩版长袖新品修身连衣裙(黑色 XL)', '86.00', '女装', '2018-02-07 11:29:31');
INSERT INTO `index_goods` VALUES ('33', 'img/index_4f_r_t2_1', '古奇天伦乐福鞋女平底女鞋软妹单鞋复古鞋女冬加绒小皮鞋女8471-1大码41', '158.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('34', 'img/index_4f_r_t2_2', '羽陌伦诗秋冬韩版女士单鞋深口系带休闲布洛克鞋粗跟中跟鞋防滑耐磨橡胶底马蹄跟低跟女鞋纯色H137(军绿色 39)', '89.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('35', 'img/index_4f_r_t2_3', '洛尚2017新款秋冬豆豆棉鞋加绒低跟单鞋摇摇鞋女松糕厚底妈妈女鞋大码41LS1319(灰色 41)', '129.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('36', 'img/index_4f_r_t2_4', '皮鞋女鞋子2017新款冬古奇天伦加绒粗跟韩版百搭中跟高跟鞋8142-2', '158.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('37', 'img/index_4f_r_t2_5', '2017新款兔毛单鞋 秋季尖头毛毛鞋女冬 平底女鞋豆豆鞋毛毛瓢鞋', '69.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('38', 'img/index_4f_r_t2_6', '2017秋冬韩版新款女士厚底松糕鞋磨砂复古内增高休闲学生系带女鞋(米色 35)', '89.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('39', 'img/index_4f_r_t2_7', '古奇天伦粗跟高跟鞋黑色皮鞋英伦2017冬季百搭2018新款春季单鞋真皮女鞋子8890', '178.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('40', 'img/index_4f_r_t2_8', '大盛公羊飞织内增高女鞋时尚潮鞋秋冬款日常户外休闲鞋DS1788(紫色 39)', '129.00', '女鞋', '2018-02-07 11:54:18');
INSERT INTO `index_goods` VALUES ('41', 'img/index_5f_r_t2_1', '鬼冢虎运动鞋', '398.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('42', 'img/index_5f_r_t2_2', 'NIKE AIR MAX 跑鞋', '389.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('43', 'img/index_5f_r_t2_3', 'NIKE奥利奥休闲跑步鞋', '298.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('44', 'img/index_5f_r_t2_4', '阿迪达斯缓震跑步鞋', '339.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('45', 'img/index_5f_r_t2_5', '阿迪达斯男装余文乐同款羽绒服冬季新款保暖运动服休闲防风夹克外套M68830(蓝色 XXL)', '568.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('46', 'img/index_5f_r_t2_6', '新款阿迪达斯/adidas三叶草韩版羽绒服吴亦凡同款中长款连帽休闲防风外套男士白鸭绒毛领上衣潮AY8638 AY8639(蓝色 XL)', '789.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('47', 'img/index_5f_r_t2_7', 'AdidasFREELIFT 运动训练T恤', '599.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('48', 'img/index_5f_r_t2_8', 'Adidas阿迪达斯短袖透气T恤', '319.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('49', 'img/index_5f_r_t2_9', 'NIKE MAX AIR 电脑包', '238.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('50', 'img/index_5f_r_t2_10', '耐克户外手提包斜挎包', '218.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('51', 'img/index_5f_r_t2_11', '冬季防寒服 男女户外冲锋衣情侣款登山服防水加厚加绒保暖冲锋衣F1788(女款-紫红 4XL)', '189.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('52', 'img/index_5f_r_t2_12', '骆驼(Camel)男休闲户外秋冬保暖两件套男款休闲冲锋衣2F16030(红色 XXL)', '489.00', '运动鞋服', '2018-02-07 12:08:15');
INSERT INTO `index_goods` VALUES ('53', 'img/index_6f_r_t2_1', '水星家纺提花四件套欧式全棉纯棉被套双人床上四件套巴黎小夜曲(巴黎小夜曲 巴黎小夜曲)', '1499.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('54', 'img/index_6f_r_t2_2', '水星家纺真丝大提花四件套1.8米床提花套件双人暗夜骑士(暗夜骑士 暗夜骑士)', '3999.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('55', 'img/index_6f_r_t2_3', '水星家纺床品四件套纯棉全棉双人1.8床单被套床上用品菲尔斯(菲尔斯 菲尔斯)', '499.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('56', 'img/index_6f_r_t2_4', '水星家纺提花套件双人被套床单四件套欧美风套件欧域华庭(欧域华庭 欧域华庭)', '1399.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('57', 'img/index_6f_r_t2_5', '水星家纺真丝大提花四件套纯色提花套件1.8米床双人梦回彼得堡(梦回彼得堡 梦回彼得堡)', '3399.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('58', 'img/index_6f_r_t2_6', '水星家纺贡缎四件套全棉纯棉被套双人1.8米床法尔奈斯2018新品(法尔奈斯 法尔奈斯)', '699.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('59', 'img/index_6f_r_t2_7', '水星家纺婚庆六件套大红粉色喜庆结婚床上用品床单被套百合喜事', '666.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('60', 'img/index_6f_r_t2_8', '水星家纺加厚天丝磨毛四件套1.8双人床秋冬保暖床单被套夏如画', '759.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('61', 'img/index_6f_r_t2_9', '水星家纺 天丝贡缎活性印花四件套 清香花语(清香花语 清香花语)', '859.00', '家纺', '2018-02-07 12:16:02');
INSERT INTO `index_goods` VALUES ('62', 'img/index_6f_r_t2_10', '水星家纺 长绒棉贡缎四件套 1.8m双人全棉床单纯棉床品 锦熙时光(实物拍摄 默认)', '699.00', '家纺', '2018-02-07 12:16:02');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(30) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `regdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间戳',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '12345678910', 'e10adc3949ba59abbe56e057f20f883e', '2018-02-07 08:33:48');
INSERT INTO `user` VALUES ('2', '13413611594', 'd0dcbf0d12a6b1e7fbfa2ce5848f3eff', '2018-02-07 08:35:44');
INSERT INTO `user` VALUES ('3', '13413611595', 'e10adc3949ba59abbe56e057f20f883e', '2018-02-07 08:50:07');
INSERT INTO `user` VALUES ('4', '13344422144', 'e10adc3949ba59abbe56e057f20f883e', '2018-02-08 18:10:18');
INSERT INTO `user` VALUES ('5', '13413611590', 'e9f5c5240c0bb39488e6dbfbdb1517e0', '2018-02-08 18:45:30');
SET FOREIGN_KEY_CHECKS=1;
